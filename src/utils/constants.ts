// Design constants and limits

export const DESIGN_LIMITS = {
  minVelocity: 1.0, // m/s - minimum velocity for siphonic action
  maxVelocity: 3.0, // m/s - maximum velocity to prevent noise and erosion
  minOutlets: 2,
  maxOutlets: 20,
  minPipeDiameter: 50, // mm
  maxPipeDiameter: 200, // mm
};

export const CANVAS_CONFIG = {
  width: 1200,
  height: 800,
  gridSize: 50,
  scale: 20, // pixels per meter in roof plan
};

export const COLORS = {
  ok: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  pipe: '#2196F3',
  outlet: '#9C27B0',
  grid: '#E0E0E0',
  background: '#FAFAFA',
};

export const NODE_CONFIG = {
  outletRadius: 8,
  labelFontSize: 12,
  pipeStrokeWidth: 3,
};
