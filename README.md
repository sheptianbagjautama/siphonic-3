# Siphonic Roof Drainage Web Application

A web-based Siphonic Roof Drainage design tool built with React, TypeScript, and Konva.

## Features

### Phase 1 ✅
- ✅ Project input form
- ✅ Flow calculation
- ✅ Isometric canvas with Konva
- ✅ System status panel
- ✅ Real-time validation

### Phase 2 ✅
- ✅ Draggable outlet nodes
- ✅ Auto-update pipes
- ✅ Interactive tooltips on hover
- ✅ Pan & zoom canvas
- ✅ Hover highlights
- ✅ Zoom controls

### Phase 3 ✅
- ✅ Enhanced pipe sizing with visual diameter representation
- ✅ Comprehensive velocity validation
- ✅ Error & warning visualization with status badges
- ✅ Detailed validation panel with recommendations
- ✅ Color-coded system status
- ✅ Visual indicators on problematic components
- ✅ Engineering insights and recommendations

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Usage

1. **Create a Project**: Fill in project details (name, rainfall intensity, roof area)
2. **Add Outlets**: Click "Add Outlet" to add roof drainage outlets
3. **Position Outlets**: Drag outlet nodes on the isometric canvas
4. **Validate System**: Observe real-time validation with color-coded status indicators
5. **Review Issues**: Check the validation details panel for specific problems
6. **Follow Recommendations**: Use engineering recommendations to optimize the system
7. **Interact**: 
   - Hover over nodes/pipes to see detailed information
   - Drag the canvas to pan
   - Scroll to zoom in/out
   - Use zoom controls for precise control
8. **View Results**: Monitor system status and validation results in the sidebar

## Technology Stack

- React 18
- TypeScript
- Konva + react-konva (Canvas rendering)
- Zustand (State management)
- Vite (Build tool)

## Project Structure

```
src/
├── components/
│   ├── canvas/          # Konva canvas layers
│   │   ├── IsometricStage.tsx
│   │   ├── GridLayer.tsx
│   │   ├── NodeLayer.tsx
│   │   ├── PipeLayer.tsx
│   │   └── TooltipLayer.tsx
│   ├── nodes/           # Outlet and pipe components
│   │   ├── OutletNode.tsx
│   │   └── PipeSegment.tsx
│   └── ui/              # UI components
│       ├── ProjectForm.tsx
│       ├── SystemStatusPanel.tsx
│       └── CanvasControls.tsx
├── modules/
│   ├── calculation/     # Flow calculations
│   ├── validation/      # System validation
│   └── sizing/          # Pipe sizing
├── store/               # Zustand state
├── types/               # TypeScript types
└── utils/               # Utilities
```

## Build

```bash
npm run build
```

## License

MIT
