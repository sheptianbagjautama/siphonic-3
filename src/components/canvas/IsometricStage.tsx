// Isometric Stage - main Konva canvas component

import React, { useState } from 'react';
import { Stage } from 'react-konva';
import { GridLayer } from './GridLayer';
import { NodeLayer } from './NodeLayer';
import { PipeLayer } from './PipeLayer';
import { Outlet, Pipe } from '@/types';
import { CANVAS_CONFIG, COLORS } from '@/utils/constants';

interface IsometricStageProps {
  outlets: Outlet[];
  pipes: Pipe[];
  onOutletDragEnd: (id: string, x: number, y: number) => void;
}

export const IsometricStage: React.FC<IsometricStageProps> = ({
  outlets,
  pipes,
  onOutletDragEnd,
}) => {
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);

  return (
    <div style={{ 
      border: `2px solid ${COLORS.grid}`, 
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: COLORS.background,
    }}>
      <Stage
        width={CANVAS_CONFIG.width}
        height={CANVAS_CONFIG.height}
      >
        <GridLayer />
        <PipeLayer pipes={pipes} outlets={outlets} />
        <NodeLayer 
          outlets={outlets} 
          onOutletDragEnd={onOutletDragEnd}
          selectedOutletId={selectedOutletId}
        />
      </Stage>
    </div>
  );
};
