// Validation Details Panel - shows detailed validation information

import React from 'react';
import { ValidationResult, Outlet, Pipe } from '@/types';
import { COLORS } from '@/utils/constants';

interface ValidationDetailsPanelProps {
  validation: ValidationResult | null;
  outlets: Outlet[];
  pipes: Pipe[];
}

export const ValidationDetailsPanel: React.FC<ValidationDetailsPanelProps> = ({ 
  validation, 
  outlets,
  pipes 
}) => {
  if (!validation) {
    return null;
  }

  const errorCount = validation.messages.filter(m => 
    m.toLowerCase().includes('error') || validation.status === 'ERROR'
  ).length;
  
  const warningCount = validation.messages.filter(m => 
    m.toLowerCase().includes('warning') || validation.status === 'WARNING'
  ).length;

  const problematicOutlets = outlets.filter(o => o.status === 'ERROR' || o.status === 'WARNING');
  const problematicPipes = pipes.filter(p => p.status === 'ERROR' || p.status === 'WARNING');

  const getRecommendations = () => {
    const recs: string[] = [];
    
    if (validation.status === 'ERROR') {
      recs.push('Review and fix all errors before proceeding');
    }
    
    if (problematicPipes.length > 0) {
      const highVelocityPipes = pipes.filter(p => p.velocity > 2.7);
      const lowVelocityPipes = pipes.filter(p => p.velocity < 1.2);
      
      if (highVelocityPipes.length > 0) {
        recs.push('Consider increasing pipe diameter to reduce velocity');
      }
      if (lowVelocityPipes.length > 0) {
        recs.push('Consider decreasing pipe diameter to increase velocity');
      }
    }
    
    if (outlets.length < 3) {
      recs.push('Adding more outlets may improve system balance');
    }
    
    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Validation Details</h3>
      
      {/* Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <span style={styles.label}>Status:</span>
          <span style={{
            ...styles.statusBadge,
            backgroundColor: validation.status === 'OK' ? COLORS.ok : 
                           validation.status === 'WARNING' ? COLORS.warning : COLORS.error
          }}>
            {validation.status}
          </span>
        </div>
        
        {errorCount > 0 && (
          <div style={styles.summaryItem}>
            <span style={styles.errorDot}>●</span>
            <span>{errorCount} Error{errorCount !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        {warningCount > 0 && (
          <div style={styles.summaryItem}>
            <span style={styles.warningDot}>●</span>
            <span>{warningCount} Warning{warningCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Problematic Components */}
      {(problematicOutlets.length > 0 || problematicPipes.length > 0) && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Issues Found:</h4>
          
          {problematicOutlets.length > 0 && (
            <div style={styles.issueGroup}>
              <strong>Outlets ({problematicOutlets.length}):</strong>
              <ul style={styles.list}>
                {problematicOutlets.map(outlet => (
                  <li key={outlet.id} style={styles.listItem}>
                    <span style={{
                      ...styles.statusDot,
                      backgroundColor: outlet.status === 'ERROR' ? COLORS.error : COLORS.warning
                    }} />
                    {outlet.id.substring(0, 8)} - {outlet.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {problematicPipes.length > 0 && (
            <div style={styles.issueGroup}>
              <strong>Pipes ({problematicPipes.length}):</strong>
              <ul style={styles.list}>
                {problematicPipes.map(pipe => (
                  <li key={pipe.id} style={styles.listItem}>
                    <span style={{
                      ...styles.statusDot,
                      backgroundColor: pipe.status === 'ERROR' ? COLORS.error : COLORS.warning
                    }} />
                    Ø{pipe.diameter}mm - {pipe.velocity.toFixed(2)}m/s - {pipe.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      {validation.messages.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Details:</h4>
          <div style={styles.messageList}>
            {validation.messages.map((msg, idx) => (
              <div key={idx} style={styles.message}>
                <span style={styles.messageBullet}>•</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>💡 Recommendations:</h4>
          <ul style={styles.list}>
            {recommendations.map((rec, idx) => (
              <li key={idx} style={styles.recommendation}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginTop: '15px',
    fontSize: '13px',
  },
  title: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    borderBottom: '2px solid #2196F3',
    paddingBottom: '8px',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '15px',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    fontWeight: '500' as const,
  },
  statusBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold' as const,
  },
  errorDot: {
    color: COLORS.error,
    fontSize: '16px',
  },
  warningDot: {
    color: COLORS.warning,
    fontSize: '16px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  section: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #eee',
  },
  sectionTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: '600' as const,
  },
  issueGroup: {
    marginBottom: '10px',
  },
  list: {
    margin: '5px 0',
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  message: {
    display: 'flex',
    gap: '8px',
    lineHeight: '1.4',
  },
  messageBullet: {
    fontWeight: 'bold' as const,
    color: '#666',
  },
  recommendation: {
    marginBottom: '6px',
    color: '#1976D2',
    lineHeight: '1.4',
  },
};
