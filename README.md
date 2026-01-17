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

### Phase 4 ✅
- ✅ Comprehensive system report with project summary
- ✅ Export diagram as PNG/JPEG
- ✅ Export complete report as PDF
- ✅ Report panel with detailed outlet and pipe tables
- ✅ Validation summary in reports
- ✅ Design notes documentation

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
7. **View Report**: Click "Show Report" button to see comprehensive system summary
8. **Export**: Use the Export button to:
   - Save diagram as PNG or JPEG image
   - Generate PDF report with diagram and data tables
9. **Interact**: 
   - Hover over nodes/pipes to see detailed information
   - Drag the canvas to pan
   - Scroll to zoom in/out
   - Use zoom controls for precise control
10. **View Results**: Monitor system status and validation results in the sidebar

## Phase 4 Features

### System Report
- Complete project details and configuration
- Outlet summary table with flow rates and status
- Pipe summary table with diameter, velocity, and validation
- Validation results with issues list
- Design notes and standards

### Export Capabilities
- **PNG Export**: High-resolution diagram export for presentations
- **JPEG Export**: Compressed format for documents
- **PDF Export**: Complete report including:
  - Project information
  - Outlet and pipe tables
  - Validation summary
  - System diagram
  - Design notes

### Professional UI
- Toggle report panel visibility
- Export controls in header
- Comprehensive data tables
- Professional formatting for reports

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
