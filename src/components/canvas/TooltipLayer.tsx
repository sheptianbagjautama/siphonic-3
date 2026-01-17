// Tooltip Layer - displays information on hover

import React from 'react';
import { Layer, Rect, Text, Group } from 'react-konva';

export interface TooltipData {
  x: number;
  y: number;
  title: string;
  items: { label: string; value: string }[];
}

interface TooltipLayerProps {
  tooltip: TooltipData | null;
}

export const TooltipLayer: React.FC<TooltipLayerProps> = ({ tooltip }) => {
  if (!tooltip) return <Layer />;

  const padding = 10;
  const lineHeight = 18;
  const titleHeight = 20;
  const width = 180;
  const height = titleHeight + tooltip.items.length * lineHeight + padding * 2;

  return (
    <Layer>
      <Group x={tooltip.x + 15} y={tooltip.y - height / 2}>
        {/* Background */}
        <Rect
          width={width}
          height={height}
          fill="rgba(0, 0, 0, 0.85)"
          cornerRadius={6}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.3}
          shadowOffsetX={2}
          shadowOffsetY={2}
        />

        {/* Title */}
        <Text
          x={padding}
          y={padding}
          text={tooltip.title}
          fontSize={14}
          fontStyle="bold"
          fill="#FFD700"
          width={width - padding * 2}
        />

        {/* Items */}
        {tooltip.items.map((item, index) => (
          <Group key={index} y={padding + titleHeight + index * lineHeight}>
            <Text
              x={padding}
              text={item.label}
              fontSize={12}
              fill="#CCCCCC"
            />
            <Text
              x={padding + 90}
              text={item.value}
              fontSize={12}
              fill="#FFFFFF"
              fontStyle="bold"
            />
          </Group>
        ))}
      </Group>
    </Layer>
  );
};
