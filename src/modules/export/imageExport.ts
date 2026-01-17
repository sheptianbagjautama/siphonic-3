// Image Export Module - Export canvas as PNG/JPEG

export const exportAsImage = (
  stage: any,
  filename: string = 'siphonic-system',
  format: 'png' | 'jpeg' = 'png'
): void => {
  if (!stage) {
    console.error('Stage not available for export');
    return;
  }

  try {
    // Get the data URL from the stage
    const dataURL = stage.toDataURL({
      mimeType: format === 'png' ? 'image/png' : 'image/jpeg',
      quality: 1,
      pixelRatio: 2, // Higher resolution
    });

    // Create a download link
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting image:', error);
    alert('Failed to export image. Please try again.');
  }
};

export const exportAsBlob = async (
  stage: any,
  format: 'png' | 'jpeg' = 'png'
): Promise<Blob | null> => {
  if (!stage) {
    console.error('Stage not available for export');
    return null;
  }

  try {
    const dataURL = stage.toDataURL({
      mimeType: format === 'png' ? 'image/png' : 'image/jpeg',
      quality: 1,
      pixelRatio: 2,
    });

    // Convert data URL to Blob
    const response = await fetch(dataURL);
    return await response.blob();
  } catch (error) {
    console.error('Error creating blob:', error);
    return null;
  }
};
