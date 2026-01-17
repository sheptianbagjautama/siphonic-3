// Pipe Layer - renders all pipe segments

import React from 'react';
import { Layer } from 'react-konva';
import { Pipe, Outlet } from '@/types';
import { PipeSegment } from '@/components/nodes/PipeSegment';
import { TooltipData } from './TooltipLayer';

interface PipeLayerProps {
  pipes: Pipe[];
  outlets: Outlet[];
  onHover: (tooltip: TooltipData | null) => void;
}

export const PipeLayer: React.FC<PipeLayerProps> = ({ pipes, outlets, onHover }) => {
  return (
    <Layer>
      {pipes.map(pipe => {
        const fromOutlet = outlets.find(o => o.id === pipe.fromNodeId);
        const toOutlet = outlets.find(o => o.id === pipe.toNodeId);
        
        if (!fromOutlet || !toOutlet) return null;
        
        return (
          <PipeSegment
            key={pipe.id}
            pipe={pipe}
            fromOutlet={fromOutlet}
            toOutlet={toOutlet}
            onHover={onHover}
          />
        );
      })}
    </Layer>
  );
};
