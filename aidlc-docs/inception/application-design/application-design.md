# Application Design — ASCII Tower Defense

## Overview

A functional/data-driven terminal tower defense game built with TypeScript and a TUI framework. Game state is an immutable data structure transformed by pure functions each tick.

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Architecture pattern | Functional/data-driven | Pure functions, testable, simple state management |
| Module organization | Feature folders | Clear separation of concerns by game domain |
| Rendering | Full TUI framework (blessed/ink) | Handles terminal complexity, cross-platform |
| State management | Immutable state + tick pipeline | Predictable, debuggable, no race conditions |

## Components (8)

1. **GameState** — Central immutable state record
2. **Map** — Grid, path definition, spatial queries
3. **Towers** — Tower configs, placement, targeting, attacks
4. **Enemies** — Enemy configs, movement, spawning
5. **Waves** — Wave definitions, progression logic
6. **Economy** — Currency, lives, score tracking
7. **Input** — Keypress → command translation (vim motions)
8. **Renderer** — TUI-based terminal rendering

## Game Loop Pipeline (per tick)

```
Input → Spawn → Move → Attack → Kill → Escape → Win/Lose → Wave → Render
```

Each step is a pure function: `(state) → state`

## Source Structure

```
src/
├── core/       # State types, game loop, runner
├── towers/     # Tower domain
├── enemies/    # Enemy domain
├── waves/      # Wave progression
├── economy/    # Resources
├── map/        # Grid and levels
├── input/      # Keyboard handling
├── rendering/  # TUI output
└── index.ts    # Entry point
```

## Key Design Principles

- **No shared mutable state** — state is passed through, never mutated
- **Side effects at boundaries** — only Input and Renderer touch the outside world
- **Composition over inheritance** — tower/enemy types are config data, not class hierarchies
- **Testable by default** — pure functions with known inputs produce known outputs
