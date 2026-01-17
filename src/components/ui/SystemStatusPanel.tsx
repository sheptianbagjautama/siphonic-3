// System Status Panel Component

import React from 'react';
import { ValidationResult } from '@/types';
import { COLORS } from '@/utils/constants';

interface SystemStatusPanelProps {
  validation: ValidationResult | null;
}

export const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ validation }) => {
  if (!validation) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>System Status</h3>
        <p style={styles.noData}>No validation data available</p>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (validation.status) {
      case 'OK':
        return COLORS.ok;
      case 'WARNING':
        return COLORS.warning;
      case 'ERROR':
        return COLORS.error;
      default:
        return '#999';
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>System Status</h3>
      
      <div style={{
        ...styles.statusBadge,
        backgroundColor: getStatusColor(),
      }}>
        {validation.status}
      </div>

      <div style={styles.messages}>
        {validation.messages.length === 0 ? (
          <p style={styles.message}>No messages</p>
        ) : (
          validation.messages.map((msg, index) => (
            <div key={index} style={styles.message}>
              <span style={styles.bullet}>•</span>
              {msg}
            </div>
          ))
        )}
      </div>

      {!validation.isValid && (
        <div style={styles.alert}>
          ⚠️ System has validation errors that must be resolved
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '20px',
    fontWeight: 'bold' as const,
  },
  noData: {
    color: '#999',
    fontStyle: 'italic' as const,
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: '14px',
    marginBottom: '15px',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  message: {
    fontSize: '14px',
    lineHeight: '1.5',
    display: 'flex',
    gap: '8px',
  },
  bullet: {
    fontWeight: 'bold' as const,
  },
  alert: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#FFF3E0',
    border: '1px solid #FF9800',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#E65100',
  },
};
