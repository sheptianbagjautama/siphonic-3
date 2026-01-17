// Project Form Component

import React, { useState } from 'react';
import { useProjectStore } from '@/store/projectStore';

export const ProjectForm: React.FC = () => {
  const { project, createProject, updateProject, addOutlet } = useProjectStore();
  
  const [name, setName] = useState('Siphonic Drainage Project');
  const [rainfallIntensity, setRainfallIntensity] = useState(100);
  const [roofArea, setRoofArea] = useState(500);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(name, rainfallIntensity, roofArea);
  };

  const handleUpdateProject = () => {
    if (!project) return;
    updateProject({
      name,
      rainfallIntensity,
      roofArea,
    });
  };

  const handleAddOutlet = () => {
    // Add outlet at random position for demo
    const x = Math.random() * 10 - 5; // -5 to 5 meters
    const y = Math.random() * 10 - 5;
    const elevation = 10; // Fixed elevation for demo
    addOutlet(x, y, elevation);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Project Setup</h2>
      
      {!project ? (
        <form onSubmit={handleCreateProject} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Project Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Rainfall Intensity (mm/h):</label>
            <input
              type="number"
              value={rainfallIntensity}
              onChange={(e) => setRainfallIntensity(Number(e.target.value))}
              style={styles.input}
              required
              min="1"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Roof Area (m²):</label>
            <input
              type="number"
              value={roofArea}
              onChange={(e) => setRoofArea(Number(e.target.value))}
              style={styles.input}
              required
              min="1"
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Project
          </button>
        </form>
      ) : (
        <div style={styles.projectInfo}>
          <div style={styles.infoRow}>
            <strong>Name:</strong> {project.name}
          </div>
          <div style={styles.infoRow}>
            <strong>Rainfall:</strong> {project.rainfallIntensity} mm/h
          </div>
          <div style={styles.infoRow}>
            <strong>Roof Area:</strong> {project.roofArea} m²
          </div>
          <div style={styles.infoRow}>
            <strong>Outlets:</strong> {project.outlets.length}
          </div>
          
          <div style={styles.buttonGroup}>
            <button onClick={handleAddOutlet} style={styles.button}>
              Add Outlet
            </button>
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
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: 'bold' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500' as const,
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500' as const,
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  infoRow: {
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
};
