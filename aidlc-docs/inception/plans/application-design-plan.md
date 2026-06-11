# Application Design Plan

## Plan Steps
- [x] Identify core components and responsibilities
- [x] Define component interfaces and method signatures
- [x] Define service/orchestration layer
- [x] Map component dependencies and data flow
- [x] Consolidate into unified application design document

---

## Questions

### Architecture Style

## Question 1
What architecture pattern do you prefer for the game's internal structure?

A) ECS (Entity-Component-System) — entities are IDs, components are pure data, systems process them. Common in game dev, highly composable.

B) OOP with inheritance — Tower base class, Enemy base class, etc. Traditional and straightforward.

C) Functional/data-driven — plain data objects + pure functions that transform game state each tick. Simple, testable.

D) Other (please describe after [Answer]: tag below)

[Answer]: C

### Module Boundaries

## Question 2
How should the source code be organized?

A) Flat structure — all modules in `src/` (game.ts, renderer.ts, entities.ts, input.ts, etc.)

B) Feature folders — `src/towers/`, `src/enemies/`, `src/rendering/`, `src/core/`

C) Layer-based — `src/engine/`, `src/presentation/`, `src/domain/`, `src/input/`

D) Other (please describe after [Answer]: tag below)

[Answer]: B

### Rendering Approach

## Question 3
What terminal rendering approach should we use?

A) Raw ANSI escape codes — no dependencies, full control, more manual work

B) A lightweight library like `ansi-escapes` + `chalk` for colors — minimal deps, still low-level

C) A full TUI framework like `blessed` or `ink` — more abstraction, heavier dependency

D) Other (please describe after [Answer]: tag below)

[Answer]: C
