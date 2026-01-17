// Outlet Node Component

import React from 'react';
import { Circle, Text, Group } from 'react-konva';
import { Outlet } from '@/types';
import { toIsometric } from '@/utils/geometry';
import { CANVAS_CONFIG, COLORS, NODE_CONFIG } from '@/utils/constants';

interface OutletNodeProps {
  outlet: Outlet;
  onDragEnd: (id: string, x: number, y: number) => void;
  selected?: boolean;
}

export const OutletNode: React.FC<OutletNodeProps> = ({ outlet, onDragEnd, selected }) => {
  const iso = toIsometric(outlet.x * CANVAS_CONFIG.scale, outlet.y * CANVAS_CONFIG.scale);
  
  // Adjust for canvas center
  const x = iso.isoX + CANVAS_CONFIG.width / 2;
  const y = iso.isoY + CANVAS_CONFIG.height / 2;

  const getColor = () => {
    if (selected) return '#FFD700'; // Gold when selected
    if (outlet.status === 'ERROR') return COLORS.error;
    if (outlet.status === 'WARNING') return COLORS.warning;
    if (outlet.status === 'OK') return COLORS.ok;
    return COLORS.outlet;
  };

  const handleDragEnd = (e: any) => {
    const newX = e.target.x();
    const newY = e.target.y();
    
    // Convert back from canvas to roof coordinates
    const canvasIsoX = newX - CANVAS_CONFIG.width / 2;
    const canvasIsoY = newY - CANVAS_CONFIG.height / 2;
    
    // Approximate conversion back to roof coordinates
    const roofX = (canvasIsoX + 2 * canvasIsoY) / 2 / CANVAS_CONFIG.scale;
    const roofY = (2 * canvasIsoY - canvasIsoX) / 2 / CANVAS_CONFIG.scale;
    
    onDragEnd(outlet.id, roofX, roofY);
  };

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={handleDragEnd}
    >
      {/* Outlet circle */}
      <Circle
        radius={NODE_CONFIG.outletRadius}
        fill={getColor()}
        stroke="#000"
        strokeWidth={2}
      />
      
      {/* Outlet ID label */}
      <Text
        text={outlet.id.substring(0, 6)}
        fontSize={NODE_CONFIG.labelFontSize}
        fill="#000"
        offsetX={15}
        offsetY={-20}
      />
      
      {/* Flow label */}
      <Text
        text={`${outlet.flow.toFixed(2)} L/s`}
        fontSize={10}
        fill="#666"
        offsetX={15}
        offsetY={-8}
      />
    </Group>
  );
};
