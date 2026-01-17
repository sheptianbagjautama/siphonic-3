// Zustand store for project state management

import { create } from 'zustand';
import { Project, Outlet, Pipe, ValidationResult, SystemStatus } from '@/types';
import { generateId } from '@/utils/geometry';
import { calculateFlows } from '@/modules/calculation/flowCalculation';
import { validateSystem } from '@/modules/validation/systemValidation';
import { sizePipe } from '@/modules/sizing/pipeSizing';

interface ProjectStore {
  project: Project | null;
  pipes: Pipe[];
  validation: ValidationResult | null;
  
  // Actions
  createProject: (name: string, rainfallIntensity: number, roofArea: number) => void;
  updateProject: (updates: Partial<Project>) => void;
  addOutlet: (x: number, y: number, elevation: number) => void;
  removeOutlet: (id: string) => void;
  updateOutlet: (id: string, updates: Partial<Outlet>) => void;
  recalculate: () => void;
  reset: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: null,
  pipes: [],
  validation: null,

  createProject: (name, rainfallIntensity, roofArea) => {
    const project: Project = {
      id: generateId(),
      name,
      rainfallIntensity,
      roofArea,
      outlets: [],
    };
    set({ project });
  },

  updateProject: (updates) => {
    const { project } = get();
    if (!project) return;
    
    set({
      project: { ...project, ...updates },
    });
    get().recalculate();
  },

  addOutlet: (x, y, elevation) => {
    const { project } = get();
    if (!project) return;

    const outlet: Outlet = {
      id: generateId(),
      x,
      y,
      elevation,
      flow: 0,
      type: 'siphonic',
    };

    const updatedProject = {
      ...project,
      outlets: [...project.outlets, outlet],
    };

    set({ project: updatedProject });
    get().recalculate();
  },

  removeOutlet: (id) => {
    const { project } = get();
    if (!project) return;

    const updatedProject = {
      ...project,
      outlets: project.outlets.filter(o => o.id !== id),
    };

    set({ project: updatedProject });
    get().recalculate();
  },

  updateOutlet: (id, updates) => {
    const { project } = get();
    if (!project) return;

    const updatedProject = {
      ...project,
      outlets: project.outlets.map(o =>
        o.id === id ? { ...o, ...updates } : o
      ),
    };

    set({ project: updatedProject });
    get().recalculate();
  },

  recalculate: () => {
    const { project } = get();
    if (!project || project.outlets.length === 0) {
      set({ pipes: [], validation: null });
      return;
    }

    // Calculate flows for all outlets
    const outletsWithFlow = calculateFlows(project);
    
    // Create pipes connecting outlets (simplified for Phase 1)
    // In a real system, this would be more complex with actual pipe routing
    const pipes: Pipe[] = [];
    
    // For demo purposes, create a pipe from each outlet to a common point
    if (outletsWithFlow.length > 1) {
      outletsWithFlow.forEach((outlet, index) => {
        if (index < outletsWithFlow.length - 1) {
          const nextOutlet = outletsWithFlow[index + 1];
          const avgFlow = (outlet.flow + nextOutlet.flow) / 2;
          const sizing = sizePipe(avgFlow);
          
          pipes.push({
            id: generateId(),
            fromNodeId: outlet.id,
            toNodeId: nextOutlet.id,
            length: 5, // simplified - would calculate from positions
            diameter: sizing.diameter,
            velocity: sizing.velocity,
            flow: avgFlow,
            status: sizing.status,
          });
        }
      });
    }

    // Validate system
    const validation = validateSystem(outletsWithFlow, pipes);

    // Assign status to outlets based on validation
    const outletsWithStatus = outletsWithFlow.map(outlet => {
      // Check if outlet has balanced flow
      const avgFlow = outletsWithFlow.reduce((sum, o) => sum + o.flow, 0) / outletsWithFlow.length;
      const flowDeviation = Math.abs(outlet.flow - avgFlow) / avgFlow;
      
      let status: SystemStatus = 'OK';
      if (flowDeviation > 0.2) {
        status = 'ERROR';
      } else if (flowDeviation > 0.1) {
        status = 'WARNING';
      }
      
      return { ...outlet, status };
    });

    set({
      project: {
        ...project,
        outlets: outletsWithStatus,
      },
      pipes,
      validation,
    });
  },

  reset: () => {
    set({
      project: null,
      pipes: [],
      validation: null,
    });
  },
}));
