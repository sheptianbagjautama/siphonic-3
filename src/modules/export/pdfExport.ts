// PDF Export Module - Export system report and diagram as PDF

import { Project, Pipe, ValidationResult } from '@/types';

export const exportAsPDF = async (
  project: Project | null,
  pipes: Pipe[],
  validation: ValidationResult | null,
  canvasImageBlob: Blob | null
): Promise<void> => {
  if (!project) {
    alert('No project data to export');
    return;
  }

  try {
    // Dynamically import jsPDF to reduce bundle size
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPos = margin;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Siphonic Roof Drainage System Report', margin, yPos);
    yPos += 10;

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPos);
    yPos += 15;

    // Project Details Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Project Details', margin, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Project Name: ${project.name}`, margin, yPos);
    yPos += 6;
    doc.text(`Rainfall Intensity: ${project.rainfallIntensity} mm/h`, margin, yPos);
    yPos += 6;
    doc.text(`Roof Area: ${project.roofArea} m²`, margin, yPos);
    yPos += 6;
    
    const totalFlow = project.outlets.reduce((sum, o) => sum + o.flow, 0);
    doc.text(`Total Flow: ${totalFlow.toFixed(2)} L/s`, margin, yPos);
    yPos += 12;

    // Outlets Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Outlets (${project.outlets.length})`, margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Outlets table
    const outletHeaders = ['ID', 'Flow (L/s)', 'Status'];
    const outletData = project.outlets.map(o => [
      o.id,
      o.flow.toFixed(2),
      o.status || 'OK'
    ]);

    // Simple table rendering
    const colWidths = [40, 40, 40];
    const startX = margin;
    
    // Headers
    doc.setFont('helvetica', 'bold');
    outletHeaders.forEach((header, i) => {
      doc.text(header, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), yPos);
    });
    yPos += 5;

    // Data
    doc.setFont('helvetica', 'normal');
    outletData.forEach(row => {
      row.forEach((cell, i) => {
        doc.text(cell, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), yPos);
      });
      yPos += 5;
    });
    yPos += 7;

    // Pipes Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Pipes (${pipes.length})`, margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const pipeHeaders = ['ID', 'Diameter (mm)', 'Velocity (m/s)', 'Status'];
    const pipeData = pipes.map(p => [
      p.id.substring(0, 8),
      p.diameter.toString(),
      p.velocity.toFixed(2),
      p.status
    ]);

    // Pipe headers
    doc.setFont('helvetica', 'bold');
    pipeHeaders.forEach((header, i) => {
      doc.text(header, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), yPos);
    });
    yPos += 5;

    // Pipe data
    doc.setFont('helvetica', 'normal');
    pipeData.forEach(row => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = margin;
      }
      row.forEach((cell, i) => {
        doc.text(cell, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), yPos);
      });
      yPos += 5;
    });
    yPos += 10;

    // Validation Section
    if (validation) {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Validation Results', margin, yPos);
      yPos += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Status: ${validation.status}`, margin, yPos);
      yPos += 6;
      doc.text(`Valid: ${validation.isValid ? 'Yes' : 'No'}`, margin, yPos);
      yPos += 6;

      if (validation.messages.length > 0) {
        doc.text('Issues:', margin, yPos);
        yPos += 5;
        doc.setFontSize(9);
        validation.messages.forEach(msg => {
          if (yPos > pageHeight - 15) {
            doc.addPage();
            yPos = margin;
          }
          doc.text(`• ${msg}`, margin + 5, yPos);
          yPos += 5;
        });
      }
      yPos += 10;
    }

    // Add canvas image if available
    if (canvasImageBlob) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result as string;
        
        // Add new page for diagram
        doc.addPage();
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('System Diagram', margin, margin);
        
        // Calculate image dimensions to fit on page
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (imgWidth * 3) / 4; // Maintain aspect ratio
        
        doc.addImage(imgData, 'PNG', margin, margin + 10, imgWidth, imgHeight);
        
        // Save the PDF
        doc.save(`${project.name.replace(/\s+/g, '_')}_report.pdf`);
      };
      reader.readAsDataURL(canvasImageBlob);
    } else {
      // Save without image
      doc.save(`${project.name.replace(/\s+/g, '_')}_report.pdf`);
    }
  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Failed to export PDF. Please ensure jsPDF is installed.');
  }
};
