// Pipe sizing module

import { SystemStatus } from '@/types';
import { DESIGN_LIMITS } from '@/utils/constants';
import { calculateVelocity, calculateRequiredDiameter } from '../calculation/flowCalculation';

export interface PipeSizingResult {
  diameter: number;
  velocity: number;
  status: SystemStatus;
  message: string;
}

/**
 * Size a pipe based on flow rate
 */
export function sizePipe(flow: number): PipeSizingResult {
  // Target velocity: midpoint between min and max
  const targetVelocity = (DESIGN_LIMITS.minVelocity + DESIGN_LIMITS.maxVelocity) / 2;
  
  // Calculate required diameter
  let diameter = calculateRequiredDiameter(flow, targetVelocity);
  
  // Ensure within limits
  if (diameter < DESIGN_LIMITS.minPipeDiameter) {
    diameter = DESIGN_LIMITS.minPipeDiameter;
  }
  if (diameter > DESIGN_LIMITS.maxPipeDiameter) {
    diameter = DESIGN_LIMITS.maxPipeDiameter;
  }
  
  // Calculate actual velocity with selected diameter
  const velocity = calculateVelocity(flow, diameter);
  
  // Determine status
  let status: SystemStatus = 'OK';
  let message = 'Pipe sized correctly';
  
  if (velocity < DESIGN_LIMITS.minVelocity) {
    status = 'ERROR';
    message = 'Pipe oversized - velocity too low';
  } else if (velocity > DESIGN_LIMITS.maxVelocity) {
    status = 'ERROR';
    message = 'Pipe undersized - velocity too high';
  } else if (velocity > DESIGN_LIMITS.maxVelocity * 0.9) {
    status = 'WARNING';
    message = 'Velocity approaching maximum';
  } else if (velocity < DESIGN_LIMITS.minVelocity * 1.1) {
    status = 'WARNING';
    message = 'Velocity approaching minimum';
  }
  
  return {
    diameter,
    velocity,
    status,
    message,
  };
}

/**
 * Get available standard pipe diameters
 */
export function getStandardDiameters(): number[] {
  const diameters: number[] = [];
  for (let d = DESIGN_LIMITS.minPipeDiameter; d <= DESIGN_LIMITS.maxPipeDiameter; d += 10) {
    diameters.push(d);
  }
  return diameters;
}
