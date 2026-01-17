// Isometric projection utilities

import { Point2D, IsoPoint } from '@/types';

/**
 * Convert 2D roof plan coordinates to fake isometric projection
 * @param x - X coordinate in roof plan
 * @param y - Y coordinate in roof plan
 * @returns Isometric coordinates
 */
export function toIsometric(x: number, y: number): IsoPoint {
  return {
    isoX: x - y,
    isoY: (x + y) / 2,
  };
}

/**
 * Convert isometric coordinates back to roof plan coordinates
 * @param isoX - Isometric X coordinate
 * @param isoY - Isometric Y coordinate
 * @returns Roof plan coordinates
 */
export function fromIsometric(isoX: number, isoY: number): Point2D {
  return {
    x: (isoX + 2 * isoY) / 2,
    y: (2 * isoY - isoX) / 2,
  };
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point2D, p2: Point2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format number to fixed decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
