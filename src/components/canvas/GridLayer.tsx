// Grid Layer for isometric canvas

import React from 'react';
import { Layer, Line } from 'react-konva';
import { CANVAS_CONFIG, COLORS } from '@/utils/constants';

export const GridLayer: React.FC = () => {
  const { width, height, gridSize } = CANVAS_CONFIG;
  const lines: JSX.Element[] = [];

  // Vertical lines
  for (let i = 0; i <= width; i += gridSize) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i, 0, i, height]}
        stroke={COLORS.grid}
        strokeWidth={1}
        opacity={0.3}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= height; i += gridSize) {
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i, width, i]}
        stroke={COLORS.grid}
        strokeWidth={1}
        opacity={0.3}
      />
    );
  }

  return <Layer>{lines}</Layer>;
};
