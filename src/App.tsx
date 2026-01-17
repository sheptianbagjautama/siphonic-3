// Main App Component

import { useState, useRef } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { ProjectForm } from '@/components/ui/ProjectForm';
import { SystemStatusPanel } from '@/components/ui/SystemStatusPanel';
import { ValidationDetailsPanel } from '@/components/ui/ValidationDetailsPanel';
import { CanvasControls } from '@/components/ui/CanvasControls';
import { IsometricStage, IsometricStageHandle } from '@/components/canvas/IsometricStage';

function App() {
  const { project, pipes, validation, updateOutlet } = useProjectStore();
  const [currentZoom, setCurrentZoom] = useState(1);
  const stageRef = useRef<IsometricStageHandle>(null);

  const handleOutletDragEnd = (id: string, x: number, y: number) => {
    updateOutlet(id, { x, y });
  };

  const handleZoomIn = () => {
    stageRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    stageRef.current?.zoomOut();
  };

  const handleResetView = () => {
    stageRef.current?.resetView();
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🌧️ Siphonic Roof Drainage Design Tool</h1>
        <p style={styles.headerSubtitle}>Phase 3 - Engineering Logic & Validation</p>
      </header>

      <div style={styles.layout}>
        {/* Left Sidebar */}
        <aside style={styles.sidebar}>
          <ProjectForm />
          
          {project && (
            <div style={{ marginTop: '20px' }}>
              <SystemStatusPanel validation={validation} />
            </div>
          )}
          
          {project && project.outlets.length > 0 && (
            <ValidationDetailsPanel 
              validation={validation}
              outlets={project.outlets}
              pipes={pipes}
            />
          )}
        </aside>

        {/* Main Canvas */}
        <main style={styles.main}>
          {project && project.outlets.length > 0 ? (
            <>
              <div style={styles.canvasHeader}>
                <div>
                  <h2 style={styles.canvasTitle}>Isometric View</h2>
                  <p style={styles.canvasSubtitle}>
                    Interactive diagram - hover for details, drag to reposition
                  </p>
                </div>
                <CanvasControls
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onResetView={handleResetView}
                  currentZoom={currentZoom}
                />
              </div>
              <IsometricStage
                ref={stageRef}
                outlets={project.outlets}
                pipes={pipes}
                onOutletDragEnd={handleOutletDragEnd}
                onZoomChange={setCurrentZoom}
              />
            </>
          ) : (
            <div style={styles.placeholder}>
              <h2>Welcome to Siphonic Roof Drainage Design Tool</h2>
              <p>Create a project and add outlets to get started</p>
              <div style={styles.instructions}>
                <h3>Instructions:</h3>
                <ol>
                  <li>Fill in the project details on the left</li>
                  <li>Click "Create Project"</li>
                  <li>Click "Add Outlet" to add roof drainage outlets</li>
                  <li>Drag outlets on the canvas to position them</li>
                  <li>Hover over outlets and pipes for detailed information</li>
                  <li>Use scroll wheel or controls to zoom</li>
                  <li>Drag canvas to pan around</li>
                </ol>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    color: '#fff',
    padding: '20px 40px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold' as const,
  },
  headerSubtitle: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    opacity: 0.9,
  },
  layout: {
    display: 'flex',
    gap: '20px',
    padding: '20px 40px',
    maxWidth: '1800px',
    margin: '0 auto',
  },
  sidebar: {
    width: '320px',
    flexShrink: 0,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  canvasHeader: {
    backgroundColor: '#fff',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  canvasTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold' as const,
  },
  canvasSubtitle: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#666',
  },
  placeholder: {
    backgroundColor: '#fff',
    padding: '60px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
  },
  instructions: {
    marginTop: '30px',
    textAlign: 'left' as const,
    maxWidth: '500px',
    margin: '30px auto 0',
  },
};

export default App;
