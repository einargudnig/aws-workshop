# Component Dependencies

## Dependency Matrix

| Component | Depends On | Depended By |
|---|---|---|
| GameState | (all types) | Game Loop, Renderer, Input |
| Map | — | Towers, Enemies, Renderer |
| Towers | Map, Enemies | Game Loop |
| Enemies | Map | Towers, Game Loop |
| Waves | Enemies | Game Loop |
| Economy | — | Towers, Game Loop |
| Input | GameState | Game Loop |
| Renderer | GameState | Game Runner |
| Game Loop | All components | Game Runner |
| Game Runner | Game Loop, Renderer, Input | (entry point) |

## Data Flow (per tick)

```
+------------------+
|   Game Runner    |  (entry point, TUI setup)
+--------+---------+
         |
         v
+------------------+
|    Game Loop     |  (orchestrates tick pipeline)
+--------+---------+
         |
    +----+----+----+----+----+----+
    v    v    v    v    v    v    v
 Input  Waves Enemies Towers Economy Map  Renderer
         |      |       |      |         |
         v      v       v      v         v
       spawn   move   attack  spend    draw
       enemies along   enemies currency state
              path
```

## Communication Patterns

- **No shared mutable state** — all functions receive state and return new state
- **Unidirectional data flow** — state flows down from Game Loop to components
- **Events as data** — effects (attacks, kills) are returned as data arrays, consumed by renderer
- **Input as commands** — keypresses are translated to command objects, applied to state

## Source Code Organization

```
src/
├── core/           # GameState type, game loop, initializer, runner
│   ├── types.ts
│   ├── game-loop.ts
│   ├── initializer.ts
│   └── runner.ts
├── towers/         # Tower configs, placement, targeting, attacks
│   ├── types.ts
│   ├── configs.ts
│   └── logic.ts
├── enemies/        # Enemy configs, movement, spawning
│   ├── types.ts
│   ├── configs.ts
│   └── logic.ts
├── waves/          # Wave definitions, progression
│   ├── types.ts
│   └── logic.ts
├── economy/        # Currency, lives, score
│   ├── types.ts
│   └── logic.ts
├── map/            # Map definition, spatial queries
│   ├── types.ts
│   ├── levels.ts
│   └── logic.ts
├── input/          # Keypress handling, command mapping
│   ├── types.ts
│   └── handler.ts
├── rendering/      # TUI rendering, overlays, effects
│   ├── renderer.ts
│   ├── grid.ts
│   ├── ui.ts
│   └── effects.ts
└── index.ts        # Entry point
```
