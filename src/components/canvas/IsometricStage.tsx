// Isometric Stage - main Konva canvas component

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Stage } from 'react-konva';
import { GridLayer } from './GridLayer';
import { NodeLayer } from './NodeLayer';
import { PipeLayer } from './PipeLayer';
import { TooltipLayer, TooltipData } from './TooltipLayer';
import { Outlet, Pipe } from '@/types';
import { CANVAS_CONFIG, COLORS } from '@/utils/constants';

interface IsometricStageProps {
  outlets: Outlet[];
  pipes: Pipe[];
  onOutletDragEnd: (id: string, x: number, y: number) => void;
  onZoomChange?: (zoom: number) => void;
}

export interface IsometricStageHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  getStage: () => any;
}

export const IsometricStage = forwardRef<IsometricStageHandle, IsometricStageProps>((
  {
    outlets,
    pipes,
    onOutletDragEnd,
    onZoomChange,
  },
  ref
) => {
  const [selectedOutletId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [stageScale, setStageScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const stageRef = useRef<any>(null);

  const updateZoom = (newScale: number) => {
    const limitedScale = Math.max(0.5, Math.min(3, newScale));
    setStageScale(limitedScale);
    if (onZoomChange) {
      onZoomChange(limitedScale);
    }
  };

  // Expose zoom methods to parent component
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      updateZoom(stageScale * 1.2);
    },
    zoomOut: () => {
      updateZoom(stageScale / 1.2);
    },
    resetView: () => {
      updateZoom(1);
      setStagePos({ x: 0, y: 0 });
    },
    getStage: () => stageRef.current,
  }));

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    const limitedScale = Math.max(0.5, Math.min(3, newScale));

    updateZoom(limitedScale);
    setStagePos({
      x: pointer.x - mousePointTo.x * limitedScale,
      y: pointer.y - mousePointTo.y * limitedScale,
    });
  };

  return (
    <div style={{ 
      border: `2px solid ${COLORS.grid}`, 
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: COLORS.background,
      position: 'relative',
    }}>
      <Stage
        ref={stageRef}
        width={CANVAS_CONFIG.width}
        height={CANVAS_CONFIG.height}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePos.x}
        y={stagePos.y}
        draggable
        onWheel={handleWheel}
      >
        <GridLayer />
        <PipeLayer pipes={pipes} outlets={outlets} onHover={setTooltip} />
        <NodeLayer 
          outlets={outlets} 
          onOutletDragEnd={onOutletDragEnd}
          onHover={setTooltip}
          selectedOutletId={selectedOutletId}
        />
        <TooltipLayer tooltip={tooltip} />
      </Stage>
      
      {/* Zoom indicator */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
      }}>
        Zoom: {(stageScale * 100).toFixed(0)}%
      </div>
      
      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(33, 150, 243, 0.9)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        maxWidth: '200px',
      }}>
        <div>🖱️ <strong>Drag</strong> to pan canvas</div>
        <div>🎯 <strong>Drag nodes</strong> to reposition</div>
        <div>🔍 <strong>Scroll</strong> to zoom</div>
        <div>👆 <strong>Hover</strong> for details</div>
      </div>
    </div>
  );
});
