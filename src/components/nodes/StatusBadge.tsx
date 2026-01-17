// Status Badge Component - displays validation status on nodes

import React from 'react';
import { Circle, Group, Text } from 'react-konva';
import { SystemStatus } from '@/types';

interface StatusBadgeProps {
  status: SystemStatus;
  x?: number;
  y?: number;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, x = 0, y = 0 }) => {
  const getConfig = () => {
    switch (status) {
      case 'ERROR':
        return { color: '#F44336', icon: '✕', tooltip: 'Error' };
      case 'WARNING':
        return { color: '#FF9800', icon: '⚠', tooltip: 'Warning' };
      case 'OK':
        return { color: '#4CAF50', icon: '✓', tooltip: 'OK' };
      default:
        return null;
    }
  };

  const config = getConfig();
  if (!config) return null;

  return (
    <Group x={x} y={y}>
      {/* Badge circle */}
      <Circle
        radius={10}
        fill={config.color}
        stroke="#fff"
        strokeWidth={2}
        shadowColor="black"
        shadowBlur={4}
        shadowOpacity={0.3}
        shadowOffsetX={1}
        shadowOffsetY={1}
      />
      
      {/* Status icon */}
      <Text
        text={config.icon}
        fontSize={12}
        fill="#fff"
        fontStyle="bold"
        offsetX={4}
        offsetY={6}
      />
    </Group>
  );
};
