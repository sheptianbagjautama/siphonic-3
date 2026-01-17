// Canvas Controls Component

import React from 'react';

interface CanvasControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  currentZoom: number;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  currentZoom,
}) => {
  return (
    <div style={styles.container}>
      <button
        onClick={onZoomIn}
        style={styles.button}
        title="Zoom In"
      >
        ➕
      </button>
      
      <button
        onClick={onZoomOut}
        style={styles.button}
        title="Zoom Out"
      >
        ➖
      </button>
      
      <button
        onClick={onResetView}
        style={styles.button}
        title="Reset View"
      >
        🔄
      </button>
      
      <div style={styles.zoomDisplay}>
        {(currentZoom * 100).toFixed(0)}%
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  button: {
    width: '36px',
    height: '36px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  zoomDisplay: {
    padding: '0 10px',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#666',
  },
};
