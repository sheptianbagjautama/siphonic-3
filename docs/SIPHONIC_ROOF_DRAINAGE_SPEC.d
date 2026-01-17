Siap 
# 🌧️ Siphonic Roof Drainage Web Application
## Full System Specification (React + Konva)

## 1. Project Overview

This application is a **web-based Siphonic Roof Drainage design tool** that allows users to:
- Input project and rainfall data
- Perform hydraulic calculations
- Validate siphonic system rules
- Visualize the system using **2D isometric drawings**
- Prepare the system for future reporting and export

Target users:
- Engineers
- Consultants
- Contractors
- Building designers

---

## 2. Technology Stack

Frontend:
- **React.js**
- **TypeScript**

Drawing & Interaction:
- **konva**
- **react-konva**
- SVG-style shapes rendered on Canvas

State Management:
- React hooks
- Zustand (optional)

All libraries must be **free and open-source**.

---

## 3. Core Design Principles

- 2D **fake isometric projection** (not 3D)
- Engineering-focused schematic (not construction CAD)
- Clear separation between:
  - Calculation
  - Validation
  - Visualization
- Deterministic layout (predictable output)

---

## 4. High-Level System Flow

```text
USER INPUT
   ↓
FLOW CALCULATION
   ↓
PIPE SIZING
   ↓
SYSTEM VALIDATION
   ↓
ISOMETRIC CANVAS (KONVA)
   ↓
SYSTEM STATUS & REPORT
````

---

## 5. Functional Modules

---

### 5.1 Project Setup Module

Inputs:

* Project name
* Rainfall intensity (mm/h)
* Roof area (m²)
* Number of roof outlets
* Design standard (optional)

Outputs:

* Project configuration object
* Initial system status

---

### 5.2 Roof Outlet Module

Each outlet contains:

* ID
* Position (x, y) in roof plan
* Roof elevation
* Assigned flow
* Outlet type (siphonic)

Rules:

* Minimum 2 outlets required
* Outlet flow should be balanced

---

### 5.3 Hydraulic Calculation Module

#### Flow Calculation

* Total flow (L/s)
* Flow per outlet
* Flow per pipe segment

#### Velocity Calculation

* Velocity derived from flow and pipe diameter
* Must satisfy min/max design velocity

#### Pressure Calculation (Advanced Phase)

* Negative pressure (siphonic condition)
* Friction losses
* Fitting losses

---

### 5.4 Pipe Sizing Module

Inputs:

* Flow rate
* Velocity limits
* Design rules

Outputs:

* Pipe diameter
* Velocity result
* Pipe status

Rules:

* Undersized pipe → ERROR
* Oversized pipe → WARNING

---

### 5.5 System Validation Module

Validation checks:

* Minimum velocity achieved
* Maximum velocity not exceeded
* Full-bore (pipe fully filled)
* Balanced outlet flow
* Elevation difference sufficient

System Status:

* OK
* WARNING
* ERROR

---

## 6. Isometric Drawing Module (Konva-Based)

### Purpose

* Visualize siphonic system behavior
* Assist design review and validation
* Communicate system logic to client

---

### 6.1 Isometric Projection Logic

All drawing uses **2D fake isometric projection**.

Projection function:

```ts
isoX = x - y
isoY = (x + y) / 2
```

Z (elevation) is represented visually using:

* Vertical pipe lines
* Offset positioning

---

### 6.2 Canvas Architecture

Konva hierarchy:

```text
Stage
 ├─ GridLayer
 ├─ PipeLayer
 ├─ NodeLayer
 │   ├─ OutletNode
 │   ├─ ElbowNode
 ├─ UILayer
     ├─ Tooltip
     ├─ Status Icons
```

---

### 6.3 Visual Elements

#### Outlet Node

* Circle or custom shape
* Label (Outlet ID)
* Draggable
* Color-coded by system status

#### Pipe Segment

* Line or polyline
* Fixed isometric angles (30° / 150° / vertical)
* Thickness represents diameter
* Color indicates validation status

---

### 6.4 User Interaction

* Drag outlet nodes
* Auto-update connected pipes
* Pan & zoom canvas
* Hover tooltip:

  * Flow
  * Velocity
  * Diameter

---

## 7. Data Model

```ts
Project {
  id
  name
  rainfallIntensity
  roofArea
  outlets: Outlet[]
}

Outlet {
  id
  x
  y
  elevation
  flow
}

Pipe {
  id
  fromNodeId
  toNodeId
  length
  diameter
  velocity
  status
}
```

---

## 8. React Application Structure

```text
src/
 ├─ components/
 │   ├─ canvas/
 │   │   ├─ IsometricStage.tsx
 │   │   ├─ GridLayer.tsx
 │   │   ├─ PipeLayer.tsx
 │   │   └─ NodeLayer.tsx
 │   ├─ nodes/
 │   │   ├─ OutletNode.tsx
 │   │   └─ PipeSegment.tsx
 │   └─ ui/
 ├─ modules/
 │   ├─ calculation/
 │   ├─ validation/
 │   └─ sizing/
 ├─ hooks/
 ├─ store/
 ├─ utils/
 └─ pages/
```

---

## 9. MVP Development Phases

### Phase 1 – Visual Demo

* Project input form
* Flow calculation
* Static isometric canvas
* System status panel

### Phase 2 – Interactive Diagram

* Drag outlet nodes
* Auto-update pipes
* Tooltip info

### Phase 3 – Engineering Logic

* Pipe sizing
* Velocity validation
* Error & warning visualization

### Phase 4 – Professional Features

* Reports
* Export image / PDF
* Multi-roof support

---

## 10. MVP Success Criteria

* Client understands system behavior
* Isometric diagram is clear and responsive
* Validation errors are visually obvious
* System feels engineering-oriented

---

## 11. Non-Goals (Out of Scope for MVP)

* 3D rendering
* CFD simulation
* Construction-grade CAD drawings
* Full code-compliance automation

---

## 12. Guiding Philosophy

This application is:

> A **design-assistance and visualization tool**,
> not a final construction authority.

---

## 13. Future Extensions

* Auto pipe routing
* DWG export
* Cost estimation
* Cloud collaboration
* Multi-riser systems

---

END OF SPECIFICATION

```
