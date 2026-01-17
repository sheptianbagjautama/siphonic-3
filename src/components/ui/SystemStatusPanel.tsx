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

        <div style={styles.waiting}>
          <div style={styles.waitingIcon}>⏳</div>
          <p style={styles.noData}>Waiting for system data...</p>
          <p style={styles.hint}>Add outlets to begin validation</p>
        </div>
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

      {/* Status Badge */}
      <div
        style={{
          ...styles.statusBadge,
          backgroundColor: getStatusColor(),
        }}
      >
        {validation.status}
      </div>

      {/* Quick Stats */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <span style={styles.statLabel}>Validation:</span>
          <span style={styles.statValue}>
            {validation.isValid ? '✓ Passed' : '✕ Failed'}
          </span>
        </div>

        <div style={styles.stat}>
          <span style={styles.statLabel}>Issues:</span>
          <span style={styles.statValue}>{validation.messages.length}</span>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {validation.messages.length === 0 ? (
          <p style={styles.message}>No messages</p>
        ) : (
          <div style={styles.alertBox}>
            <div style={styles.alertIcon}>⚠️</div>
            <div>
              <strong>Action Required</strong>
              <p style={styles.alertText}>
                System has validation issues that should be resolved for optimal performance.
              </p>
            </div>
          </div>
        )}
      </div>

      {validation.isValid && validation.status === 'OK' && (
        <div style={styles.success}>
          <div style={styles.successIcon}>✓</div>
          <div>
            <strong>System Ready</strong>
            <p style={styles.successText}>
              All validation checks passed successfully.
            </p>
          </div>
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
  waiting: {
    textAlign: 'center' as const,
    padding: '20px',
  },
  waitingIcon: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  noData: {
    color: '#999',
    margin: '5px 0',
  },
  hint: {
    color: '#2196F3',
    fontSize: '13px',
    margin: '5px 0',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: '14px',
    marginBottom: '15px',
  },
  stats: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  statLabel: {
    color: '#666',
  },
  statValue: {
    fontWeight: '600' as const,
    color: '#333',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  message: {
    fontSize: '14px',
    lineHeight: '1.5',
  },
  alertBox: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#FFF3E0',
    border: '1px solid #FF9800',
    borderRadius: '4px',
    fontSize: '13px',
    display: 'flex',
    gap: '10px',
  },
  alertIcon: {
    fontSize: '20px',
  },
  alertText: {
    margin: '4px 0 0 0',
    color: '#E65100',
  },
  success: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#E8F5E9',
    border: '2px solid #4CAF50',
    borderRadius: '6px',
    fontSize: '13px',
    display: 'flex',
    gap: '10px',
  },
  successIcon: {
    fontSize: '20px',
    color: '#4CAF50',
    fontWeight: 'bold' as const,
  },
  successText: {
    margin: '4px 0 0 0',
    color: '#2E7D32',
  },
};
