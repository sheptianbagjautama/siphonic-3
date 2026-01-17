# Siphonic Roof Drainage Web Application

A web-based Siphonic Roof Drainage design tool built with React, TypeScript, and Konva.

## Features (Phase 1)

- ✅ Project input form
- ✅ Flow calculation
- ✅ Isometric canvas with Konva
- ✅ Draggable outlet nodes
- ✅ System status panel
- ✅ Real-time validation

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
4. **View Results**: Check system status and validation results in the sidebar

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
│   ├── nodes/           # Outlet and pipe components
│   └── ui/              # UI components
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
