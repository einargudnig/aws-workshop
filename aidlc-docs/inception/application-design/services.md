# Services (Orchestration Layer)

## Architecture Note

With a functional/data-driven approach, the "service layer" is the **game loop** — a top-level function that orchestrates the tick cycle by composing pure functions.

---

## Service: Game Loop

**Purpose**: Orchestrate one game tick by composing component functions in sequence  
**Pattern**: `state → newState` pipeline each tick

```
Each tick:
  1. Process input commands → updated state
  2. Spawn enemies (if wave active) → updated enemies
  3. Move enemies along path → updated positions
  4. Process tower attacks → damage applied, effects generated
  5. Process dead enemies → rewards applied
  6. Process escaped enemies → lives deducted
  7. Check win/lose conditions → phase update
  8. Advance wave if cleared → next wave
  9. Render new state → terminal output
```

**Tick Rate**: ~100ms (10 FPS) — configurable

---

## Service: Game Initializer

**Purpose**: Set up initial game state from level definition  
**Responsibilities**:
- Load level/map definition
- Initialize economy with starting values
- Set wave to wave 1
- Initialize cursor at center of map
- Start the game loop timer

---

## Service: Game Runner

**Purpose**: Top-level entry point — setup TUI, start game, handle cleanup  
**Responsibilities**:
- Initialize TUI framework (blessed/ink screen)
- Register input handlers
- Start game loop interval
- Handle graceful exit (restore terminal state)
- Handle terminal resize events
