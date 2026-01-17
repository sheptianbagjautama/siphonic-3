// Export Controls Component - UI for exporting diagrams and reports

import React, { useState } from 'react';

interface ExportControlsProps {
  onExportImage: (format: 'png' | 'jpeg') => void;
  onExportPDF: () => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ onExportImage, onExportPDF }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={styles.container}>
      <button
        style={styles.mainButton}
        onClick={() => setShowMenu(!showMenu)}
        title="Export options"
      >
        📥 Export
      </button>

      {showMenu && (
        <div style={styles.menu}>
          <button
            style={styles.menuItem}
            onClick={() => {
              onExportImage('png');
              setShowMenu(false);
            }}
          >
            🖼️ Export as PNG
          </button>
          <button
            style={styles.menuItem}
            onClick={() => {
              onExportImage('jpeg');
              setShowMenu(false);
            }}
          >
            🖼️ Export as JPEG
          </button>
          <button
            style={styles.menuItem}
            onClick={() => {
              onExportPDF();
              setShowMenu(false);
            }}
          >
            📄 Export as PDF
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    display: 'inline-block',
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.2s',
  },
  menu: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    minWidth: '180px',
    zIndex: 1000,
  },
  menuItem: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left' as const,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderBottom: '1px solid #f0f0f0',
  },
};
