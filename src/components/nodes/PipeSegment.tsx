// Pipe Segment Component

import React, { useState } from 'react';
import { Line, Text, Group } from 'react-konva';
import { Pipe, Outlet } from '@/types';
import { toIsometric } from '@/utils/geometry';
import { CANVAS_CONFIG, COLORS, NODE_CONFIG } from '@/utils/constants';
import { TooltipData } from '@/components/canvas/TooltipLayer';

interface PipeSegmentProps {
  pipe: Pipe;
  fromOutlet: Outlet;
  toOutlet: Outlet;
  onHover: (tooltip: TooltipData | null) => void;
}

export const PipeSegment: React.FC<PipeSegmentProps> = ({ pipe, fromOutlet, toOutlet, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const fromIso = toIsometric(fromOutlet.x * CANVAS_CONFIG.scale, fromOutlet.y * CANVAS_CONFIG.scale);
  const toIso = toIsometric(toOutlet.x * CANVAS_CONFIG.scale, toOutlet.y * CANVAS_CONFIG.scale);
  
  // Adjust for canvas center
  const x1 = fromIso.isoX + CANVAS_CONFIG.width / 2;
  const y1 = fromIso.isoY + CANVAS_CONFIG.height / 2;
  const x2 = toIso.isoX + CANVAS_CONFIG.width / 2;
  const y2 = toIso.isoY + CANVAS_CONFIG.height / 2;

  const getColor = () => {
    if (isHovered) return '#00E676'; // Bright green when hovered
    switch (pipe.status) {
      case 'ERROR':
        return COLORS.error;
      case 'WARNING':
        return COLORS.warning;
      case 'OK':
        return COLORS.ok;
      default:
        return COLORS.pipe;
    }
  };

  // Calculate midpoint for label
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const handleMouseEnter = (e: any) => {
    setIsHovered(true);
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'pointer';
    }
    
    onHover({
      x: midX,
      y: midY,
      title: `Pipe ${pipe.id.substring(0, 8)}`,
      items: [
        { label: 'Diameter:', value: `${pipe.diameter} mm` },
        { label: 'Flow:', value: `${pipe.flow.toFixed(2)} L/s` },
        { label: 'Velocity:', value: `${pipe.velocity.toFixed(2)} m/s` },
        { label: 'Length:', value: `${pipe.length.toFixed(1)} m` },
        { label: 'Status:', value: pipe.status },
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
    <Group>
      {/* Pipe line */}
      <Line
        points={[x1, y1, x2, y2]}
        stroke={getColor()}
        strokeWidth={isHovered ? NODE_CONFIG.pipeStrokeWidth + 2 : NODE_CONFIG.pipeStrokeWidth}
        opacity={isHovered ? 1 : 0.8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Pipe info label */}
      <Text
        x={midX}
        y={midY - 15}
        text={`Ø${pipe.diameter}mm`}
        fontSize={10}
        fill="#333"
      />
      <Text
        x={midX}
        y={midY - 3}
        text={`v=${pipe.velocity.toFixed(2)}m/s`}
        fontSize={9}
        fill="#666"
      />
    </Group>
  );
};
