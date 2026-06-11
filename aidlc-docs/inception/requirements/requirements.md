# Requirements: ASCII Tower Defense Terminal Game

## Intent Analysis

- **User Request**: Create an ASCII-inspired tower defense game played in the terminal
- **Request Type**: New Project (Greenfield)
- **Scope Estimate**: Single Component (standalone terminal application)
- **Complexity Estimate**: Moderate (real-time game loop, multiple entity types, terminal rendering)

---

## Functional Requirements

### FR-01: Game Map & Grid
- The game displays a fixed-path map rendered as a 2D grid in the terminal
- Enemies follow a predefined path from an entrance point to an exit point
- Towers can be placed on valid tiles adjacent to (but not on) the path
- The map uses colored ASCII characters for visual distinction between terrain, path, towers, and enemies

### FR-02: Tower Types (4-6 types)
- **Basic Tower**: Low cost, moderate damage, moderate range
- **Sniper Tower**: High cost, high damage, long range, slow fire rate
- **Splash Tower**: Medium cost, area-of-effect damage, short range
- **Slow Tower**: Medium cost, slows enemies in range, no direct damage
- **Rapid Tower**: Medium cost, low damage, very fast fire rate
- Each tower has a placement cost deducted from player currency

### FR-03: Tower Upgrades
- Each tower can be upgraded (up to 2 levels) to improve stats (damage, range, fire rate)
- Upgrades cost currency and are applied to individual placed towers
- Visual indicator shows tower upgrade level (e.g., color change or symbol change)

### FR-04: Enemy Types & Waves
- Multiple enemy types with varying HP, speed, and reward values:
  - **Normal**: Balanced stats
  - **Fast**: Low HP, high speed
  - **Tank**: High HP, slow speed
  - **Swarm**: Very low HP, spawns in large groups
- Enemies spawn in waves with increasing difficulty
- Wave composition varies (mix of enemy types)
- Enemies move along the fixed path toward the exit

### FR-05: Game Economy
- Player starts with initial currency
- Currency earned by killing enemies (varies by enemy type)
- Currency spent on placing towers and upgrading towers
- Player has a lives/health counter; enemies reaching the exit reduce lives

### FR-06: Real-Time Gameplay
- Game runs in real-time with a configurable tick rate
- Enemies move continuously along the path
- Towers fire automatically at enemies within range
- Player can place/upgrade towers during gameplay (no pause between waves required)
- Player can pause the game

### FR-07: Game Controls (Keyboard - Vim Motions)
- `h/j/k/l` to move cursor left/down/up/right on the grid
- Number keys or hotkeys to select tower type for placement
- Enter/Space to place selected tower at cursor position
- `u` to upgrade selected tower
- `p` to pause/unpause
- `q` to quit
- `?` to toggle controls help overlay
- Display controls help on screen

### FR-08: Game Display
- Terminal-based rendering using colored ASCII characters with ANSI colors
- Status bar showing: current wave, currency, lives, score
- Tower selection panel showing available towers and costs
- Visual projectiles or attack indicators (brief flash/symbol)
- Clear distinction between path, buildable area, towers, and enemies

### FR-09: Win/Lose Conditions
- **Lose**: Player lives reach 0
- **Win**: All waves cleared with lives remaining
- Game over screen showing final score and wave reached

### FR-10: Game Session
- No persistence — each game session is standalone
- Game starts fresh every time
- Score displayed at end (no leaderboard storage)

---

## Non-Functional Requirements

### NFR-01: Technology Stack
- **Language**: TypeScript
- **Runtime**: Node.js
- **Type Checking**: TypeScript Go native type checker (microsoft/typescript-go — Project Corsa, the 10x faster Go-based tsc)
- **Formatter & Linter**: OXC (oxlint for linting, oxc-format for formatting)
- **Terminal Rendering**: Terminal UI library (e.g., blessed, ink, or raw ANSI escape codes)
- **Distribution**: Runnable via `npx` or `npm install -g` + compiled JS

### NFR-02: Performance
- Smooth rendering at minimum 10 FPS (100ms tick) in terminal
- No perceptible input lag for keyboard commands
- Efficient game loop that doesn't max CPU usage

### NFR-03: Compatibility
- Works on macOS, Linux, and Windows terminals
- Supports standard terminal sizes (minimum 80x24, recommended 120x40)
- Graceful handling of terminal resize

### NFR-04: Error Handling (Resiliency - applicable rules)
- Graceful error handling for terminal I/O failures
- Clean exit on unexpected errors (restore terminal state)
- Input validation for all player commands
- Timeout handling for any async operations

### NFR-05: Code Quality
- Clean TypeScript with strict mode enabled
- Modular architecture separating game logic from rendering
- Well-documented public interfaces

---

## Extension Configuration

| Extension | Enabled | Decided At | Notes |
|---|---|---|---|
| Security Baseline | No | Requirements Analysis | Not applicable for local terminal game |
| Property-Based Testing | No | Requirements Analysis | Simple game, not needed |
| Resiliency Baseline | Yes (limited) | Requirements Analysis | Only applicable rules enforced; most N/A for local app |

### Applicable Resiliency Rules
- **RESILIENCY-10 (partial)**: Timeouts on any external calls, graceful degradation — applicable as defensive coding
- **All other rules**: N/A — no cloud deployment, no persistent server, no multi-user infrastructure

---

## Constraints
- Terminal-only — no GUI, no web interface
- Single-player only
- No network connectivity required
- No persistent storage required
