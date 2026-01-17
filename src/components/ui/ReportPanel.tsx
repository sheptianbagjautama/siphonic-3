// Report Panel Component - Comprehensive system report

import React from 'react';
import { Project, Pipe, ValidationResult } from '@/types';

interface ReportPanelProps {
  project: Project | null;
  pipes: Pipe[];
  validation: ValidationResult | null;
}

export const ReportPanel: React.FC<ReportPanelProps> = ({ project, pipes, validation }) => {
  if (!project) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>System Report</h3>
        <p style={styles.noData}>No project data available</p>
      </div>
    );
  }

  const totalFlow = project.outlets.reduce((sum, o) => sum + o.flow, 0);
  const avgFlow = project.outlets.length > 0 ? totalFlow / project.outlets.length : 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>📊 System Report</h3>
        <p style={styles.subtitle}>Comprehensive design summary</p>
      </div>

      {/* Project Information */}
      <section style={styles.section}>
        <h4 style={styles.sectionTitle}>Project Details</h4>
        <div style={styles.infoGrid}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Project Name:</span>
            <span style={styles.value}>{project.name}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Rainfall Intensity:</span>
            <span style={styles.value}>{project.rainfallIntensity} mm/h</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Roof Area:</span>
            <span style={styles.value}>{project.roofArea} m²</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Total Flow:</span>
            <span style={styles.value}>{totalFlow.toFixed(2)} L/s</span>
          </div>
        </div>
      </section>

      {/* Outlet Summary */}
      <section style={styles.section}>
        <h4 style={styles.sectionTitle}>Outlets ({project.outlets.length})</h4>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Flow (L/s)</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {project.outlets.map(outlet => (
                <tr key={outlet.id} style={styles.tableRow}>
                  <td style={styles.td}>{outlet.id}</td>
                  <td style={styles.td}>{outlet.flow.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadgeStyle(outlet.status || 'OK')}>
                      {outlet.status || 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.summary}>
          <span style={styles.summaryLabel}>Average Flow:</span>
          <span style={styles.summaryValue}>{avgFlow.toFixed(2)} L/s</span>
        </div>
      </section>

      {/* Pipe Summary */}
      <section style={styles.section}>
        <h4 style={styles.sectionTitle}>Pipes ({pipes.length})</h4>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Ø (mm)</th>
                <th style={styles.th}>V (m/s)</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pipes.map(pipe => (
                <tr key={pipe.id} style={styles.tableRow}>
                  <td style={styles.td}>{pipe.id.substring(0, 8)}</td>
                  <td style={styles.td}>{pipe.diameter}</td>
                  <td style={styles.td}>{pipe.velocity.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadgeStyle(pipe.status)}>
                      {pipe.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Validation Summary */}
      {validation && (
        <section style={styles.section}>
          <h4 style={styles.sectionTitle}>Validation Results</h4>
          <div style={styles.validationBox}>
            <div style={styles.validationHeader}>
              <span style={styles.validationStatus}>
                Status: <strong style={getStatusColor(validation.status)}>{validation.status}</strong>
              </span>
              <span style={styles.validationValid}>
                {validation.isValid ? '✓ Valid' : '✕ Invalid'}
              </span>
            </div>
            {validation.messages.length > 0 && (
              <div style={styles.messagesList}>
                <strong>Issues:</strong>
                <ul style={styles.list}>
                  {validation.messages.map((msg, idx) => (
                    <li key={idx} style={styles.listItem}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Design Notes */}
      <section style={styles.section}>
        <h4 style={styles.sectionTitle}>Design Notes</h4>
        <div style={styles.notes}>
          <p style={styles.note}>• Siphonic roof drainage system design</p>
          <p style={styles.note}>• Velocity range: 1.0 - 3.0 m/s</p>
          <p style={styles.note}>• Pipe diameter range: 50 - 200 mm</p>
          <p style={styles.note}>• Full-bore flow conditions required</p>
        </div>
      </section>
    </div>
  );
};

const getStatusBadgeStyle = (status: string) => ({
  ...styles.statusBadge,
  backgroundColor: getStatusColor(status),
});

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'OK':
      return '#4CAF50';
    case 'WARNING':
      return '#FF9800';
    case 'ERROR':
      return '#F44336';
    default:
      return '#999';
  }
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto' as const,
  },
  header: {
    marginBottom: '20px',
    borderBottom: '2px solid #2196F3',
    paddingBottom: '10px',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#666',
  },
  noData: {
    color: '#999',
    textAlign: 'center' as const,
    padding: '20px',
  },
  section: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#2196F3',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  label: {
    fontWeight: '600' as const,
    color: '#555',
    fontSize: '13px',
  },
  value: {
    color: '#333',
    fontSize: '13px',
  },
  tableContainer: {
    overflowX: 'auto' as const,
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '13px',
    backgroundColor: '#fff',
  },
  tableHeaderRow: {
    backgroundColor: '#2196F3',
    color: '#fff',
  },
  th: {
    padding: '10px 8px',
    textAlign: 'left' as const,
    fontWeight: 'bold' as const,
    fontSize: '12px',
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
  },
  td: {
    padding: '8px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold' as const,
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#E3F2FD',
    borderRadius: '4px',
    marginTop: '10px',
  },
  summaryLabel: {
    fontWeight: 'bold' as const,
    color: '#1976D2',
    fontSize: '13px',
  },
  summaryValue: {
    fontWeight: 'bold' as const,
    color: '#0D47A1',
    fontSize: '13px',
  },
  validationBox: {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  validationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '13px',
  },
  validationStatus: {
    color: '#555',
  },
  validationValid: {
    fontWeight: 'bold' as const,
  },
  messagesList: {
    fontSize: '13px',
  },
  list: {
    margin: '8px 0 0 0',
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '4px',
    color: '#F44336',
  },
  notes: {
    fontSize: '13px',
    lineHeight: '1.6',
  },
  note: {
    margin: '4px 0',
    color: '#555',
  },
};
