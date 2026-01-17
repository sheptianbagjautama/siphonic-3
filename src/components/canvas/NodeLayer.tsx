// Node Layer - renders all outlet nodes

import React from 'react';
import { Layer } from 'react-konva';
import { Outlet } from '@/types';
import { OutletNode } from '@/components/nodes/OutletNode';

interface NodeLayerProps {
  outlets: Outlet[];
  onOutletDragEnd: (id: string, x: number, y: number) => void;
  selectedOutletId?: string | null;
}

export const NodeLayer: React.FC<NodeLayerProps> = ({ 
  outlets, 
  onOutletDragEnd,
  selectedOutletId 
}) => {
  return (
    <Layer>
      {outlets.map(outlet => (
        <OutletNode
          key={outlet.id}
          outlet={outlet}
          onDragEnd={onOutletDragEnd}
          selected={outlet.id === selectedOutletId}
        />
      ))}
    </Layer>
  );
};
