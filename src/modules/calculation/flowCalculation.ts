// Flow calculation module

import { Project, Outlet } from '@/types';

/**
 * Calculate total flow based on rainfall intensity and roof area
 * Q = (I × A) / 360
 * where Q = flow (L/s), I = rainfall intensity (mm/h), A = area (m²)
 */
export function calculateTotalFlow(rainfallIntensity: number, roofArea: number): number {
  return (rainfallIntensity * roofArea) / 360;
}

/**
 * Calculate flow per outlet (evenly distributed)
 */
export function calculateOutletFlow(totalFlow: number, outletCount: number): number {
  if (outletCount === 0) return 0;
  return totalFlow / outletCount;
}

/**
 * Calculate flow for all outlets in a project
 */
export function calculateFlows(project: Project): Outlet[] {
  const totalFlow = calculateTotalFlow(project.rainfallIntensity, project.roofArea);
  const flowPerOutlet = calculateOutletFlow(totalFlow, project.outlets.length);
  
  return project.outlets.map(outlet => ({
    ...outlet,
    flow: flowPerOutlet,
  }));
}

/**
 * Calculate velocity in a pipe
 * V = Q / A
 * where V = velocity (m/s), Q = flow (L/s), A = area (m²)
 */
export function calculateVelocity(flow: number, diameter: number): number {
  // Convert diameter from mm to m
  const diameterM = diameter / 1000;
  const area = Math.PI * Math.pow(diameterM / 2, 2);
  
  // Convert flow from L/s to m³/s
  const flowM3 = flow / 1000;
  
  return flowM3 / area;
}

/**
 * Calculate required pipe diameter for given flow and target velocity
 * D = sqrt((4 × Q) / (π × V))
 */
export function calculateRequiredDiameter(flow: number, targetVelocity: number): number {
  // Convert flow from L/s to m³/s
  const flowM3 = flow / 1000;
  
  // Calculate diameter in meters
  const diameterM = Math.sqrt((4 * flowM3) / (Math.PI * targetVelocity));
  
  // Convert to mm and round up to nearest 10mm
  return Math.ceil((diameterM * 1000) / 10) * 10;
}
