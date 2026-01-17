// System validation module

import { Outlet, Pipe, ValidationResult, SystemStatus } from '@/types';
import { DESIGN_LIMITS } from '@/utils/constants';

/**
 * Validate outlet configuration
 */
export function validateOutlets(outlets: Outlet[]): ValidationResult {
  const messages: string[] = [];
  let status: SystemStatus = 'OK';

  // Check minimum outlets
  if (outlets.length < DESIGN_LIMITS.minOutlets) {
    messages.push(`Minimum ${DESIGN_LIMITS.minOutlets} outlets required`);
    status = 'ERROR';
  }

  // Check maximum outlets
  if (outlets.length > DESIGN_LIMITS.maxOutlets) {
    messages.push(`Maximum ${DESIGN_LIMITS.maxOutlets} outlets exceeded`);
    status = 'ERROR';
  }

  // Check flow balance (all outlets should have similar flow)
  if (outlets.length > 0) {
    const flows = outlets.map(o => o.flow);
    const avgFlow = flows.reduce((sum, f) => sum + f, 0) / flows.length;
    const maxDeviation = Math.max(...flows.map(f => Math.abs(f - avgFlow)));
    
    if (maxDeviation > avgFlow * 0.1) {
      messages.push('Outlet flows are not balanced');
      status = status === 'ERROR' ? 'ERROR' : 'WARNING';
    }
  }

  return {
    isValid: status !== 'ERROR',
    status,
    messages,
  };
}

/**
 * Validate pipe velocity
 */
export function validatePipeVelocity(velocity: number): ValidationResult {
  const messages: string[] = [];
  let status: SystemStatus = 'OK';

  if (velocity < DESIGN_LIMITS.minVelocity) {
    messages.push(`Velocity ${velocity.toFixed(2)} m/s below minimum ${DESIGN_LIMITS.minVelocity} m/s`);
    status = 'ERROR';
  }

  if (velocity > DESIGN_LIMITS.maxVelocity) {
    messages.push(`Velocity ${velocity.toFixed(2)} m/s exceeds maximum ${DESIGN_LIMITS.maxVelocity} m/s`);
    status = 'ERROR';
  }

  // Warning zone: approaching limits
  if (velocity > DESIGN_LIMITS.maxVelocity * 0.9) {
    messages.push('Velocity approaching maximum limit');
    status = status === 'ERROR' ? 'ERROR' : 'WARNING';
  }

  return {
    isValid: status !== 'ERROR',
    status,
    messages,
  };
}

/**
 * Validate entire system
 */
export function validateSystem(outlets: Outlet[], pipes: Pipe[]): ValidationResult {
  const messages: string[] = [];
  let status: SystemStatus = 'OK';

  // Validate outlets
  const outletValidation = validateOutlets(outlets);
  messages.push(...outletValidation.messages);
  if (outletValidation.status === 'ERROR') status = 'ERROR';
  else if (outletValidation.status === 'WARNING' && status === 'OK') status = 'WARNING';

  // Validate pipes
  pipes.forEach(pipe => {
    const pipeValidation = validatePipeVelocity(pipe.velocity);
    messages.push(...pipeValidation.messages.map(msg => `Pipe ${pipe.id}: ${msg}`));
    if (pipeValidation.status === 'ERROR') status = 'ERROR';
    else if (pipeValidation.status === 'WARNING' && status === 'OK') status = 'WARNING';
  });

  if (messages.length === 0) {
    messages.push('System validation passed');
  }

  return {
    isValid: status !== 'ERROR',
    status,
    messages,
  };
}
