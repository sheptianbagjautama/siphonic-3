// Outlet Node Component

import React, { useState } from 'react';
import { Circle, Text, Group } from 'react-konva';
import { Outlet } from '@/types';
import { toIsometric } from '@/utils/geometry';
import { CANVAS_CONFIG, COLORS, NODE_CONFIG } from '@/utils/constants';
import { TooltipData } from '@/components/canvas/TooltipLayer';

interface OutletNodeProps {
  outlet: Outlet;
  onDragEnd: (id: string, x: number, y: number) => void;
  onHover: (tooltip: TooltipData | null) => void;
  selected?: boolean;
}

export const OutletNode: React.FC<OutletNodeProps> = ({ outlet, onDragEnd, onHover, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iso = toIsometric(outlet.x * CANVAS_CONFIG.scale, outlet.y * CANVAS_CONFIG.scale);
  
  // Adjust for canvas center
  const x = iso.isoX + CANVAS_CONFIG.width / 2;
  const y = iso.isoY + CANVAS_CONFIG.height / 2;

  const getColor = () => {
    if (selected) return '#FFD700'; // Gold when selected
    if (isHovered) return '#FF1744'; // Bright red when hovered
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

  const handleMouseEnter = (e: any) => {
    setIsHovered(true);
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'pointer';
    }
    
    onHover({
      x: x,
      y: y,
      title: `Outlet ${outlet.id.substring(0, 8)}`,
      items: [
        { label: 'Position:', value: `(${outlet.x.toFixed(1)}, ${outlet.y.toFixed(1)})` },
        { label: 'Elevation:', value: `${outlet.elevation.toFixed(1)} m` },
        { label: 'Flow:', value: `${outlet.flow.toFixed(2)} L/s` },
        { label: 'Status:', value: outlet.status || 'N/A' },
      ],
    });
  };

  const handleMouseLeave = (e: any) => {
    setIsHovered(false);
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'default';
    }
    onHover(null);
  };

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outlet circle */}
      <Circle
        radius={isHovered ? NODE_CONFIG.outletRadius + 2 : NODE_CONFIG.outletRadius}
        fill={getColor()}
        stroke="#000"
        strokeWidth={isHovered ? 3 : 2}
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
