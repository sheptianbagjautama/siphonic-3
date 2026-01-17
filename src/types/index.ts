// Core data types for the Siphonic Roof Drainage system

export type SystemStatus = 'OK' | 'WARNING' | 'ERROR';

export interface Project {
  id: string;
  name: string;
  rainfallIntensity: number; // mm/h
  roofArea: number; // m²
  outlets: Outlet[];
  designStandard?: string;
}

export interface Outlet {
  id: string;
  x: number; // position in roof plan
  y: number; // position in roof plan
  elevation: number; // roof elevation in meters
  flow: number; // L/s
  type: 'siphonic';
  status?: SystemStatus;
}

export interface Pipe {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  length: number; // meters
  diameter: number; // mm
  velocity: number; // m/s
  flow: number; // L/s
  status: SystemStatus;
}

export interface ValidationResult {
  isValid: boolean;
  status: SystemStatus;
  messages: string[];
}

export interface DesignLimits {
  minVelocity: number; // m/s
  maxVelocity: number; // m/s
  minOutlets: number;
  maxOutlets: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface IsoPoint {
  isoX: number;
  isoY: number;
}
