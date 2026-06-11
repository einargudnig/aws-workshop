# Code Generation Plan — Tower Defense Game

## Unit Context
- **Unit**: Single unit — complete tower defense game
- **Stories**: All 11 stories across 4 epics
- **Dependencies**: None (greenfield, standalone)
- **Code Location**: Workspace root (`/Users/einargudjonsson/personal/aws-workshop/`)

## Generation Steps

### Step 1: Project Structure Setup
- [x] Initialize npm project with package.json (name, scripts, dependencies)
- [x] Create tsconfig.json with strict mode
- [x] Create oxlint config
- [x] Create .gitignore
- [x] Install dependencies (blessed, @types/blessed)
- [x] Create src/ directory structure per application design

### Step 2: Core Types & State
- [x] Create `src/core/types.ts` — all domain entity types from functional design
- [x] Create `src/core/initializer.ts` — createInitialState function

### Step 3: Map Module
- [x] Create `src/map/types.ts` — map-specific types
- [x] Create `src/map/levels.ts` — level 1 map definition (fixed path)
- [x] Create `src/map/logic.ts` — isBuildable, getPath functions

### Step 4: Economy Module
- [x] Create `src/economy/logic.ts` — canAfford, spend, reward, loseLife functions

### Step 5: Enemies Module
- [x] Create `src/enemies/configs.ts` — enemy type configurations
- [x] Create `src/enemies/logic.ts` — spawnEnemies, moveEnemies, processDeadEnemies, processEscapedEnemies

### Step 6: Towers Module
- [x] Create `src/towers/configs.ts` — tower type configurations
- [x] Create `src/towers/logic.ts` — placeTower, upgradeTower, processTowerAttacks

### Step 7: Waves Module
- [x] Create `src/waves/logic.ts` — getWaveDefinition, isWaveCleared, nextWave, wave generation

### Step 8: Input Module
- [x] Create `src/input/types.ts` — GameCommand type, key mappings
- [x] Create `src/input/handler.ts` — handleKeypress, applyCommand

### Step 9: Rendering Module
- [x] Create `src/rendering/renderer.ts` — main render function using blessed
- [x] Create `src/rendering/grid.ts` — grid drawing (map, towers, enemies, effects)
- [x] Create `src/rendering/ui.ts` — status bar, tower panel, overlays

### Step 10: Game Loop & Runner
- [x] Create `src/core/game-loop.ts` — gameTick pipeline function
- [x] Create `src/core/runner.ts` — TUI setup, game loop interval, cleanup
- [x] Create `src/index.ts` — entry point

### Step 11: Unit Tests
- [x] Create `tests/economy.test.ts` — economy logic tests
- [x] Create `tests/enemies.test.ts` — enemy movement and death tests
- [x] Create `tests/towers.test.ts` — targeting, damage, placement tests
- [x] Create `tests/waves.test.ts` — wave progression tests
- [x] Create `tests/game-loop.test.ts` — full tick pipeline tests

### Step 12: Documentation & Config
- [x] Create README.md with install/run instructions and controls reference
- [x] Verify package.json scripts (start, build, test, lint, format)

## Story Traceability

| Step | Stories Covered |
|---|---|
| 1 | (setup) |
| 2-3 | 4.1 (Clear Game Display — map foundation) |
| 4 | 2.1, 2.2 (economy for placement/upgrades) |
| 5 | 3.1, 3.2 (Waves, Enemy Variety) |
| 6 | 2.1, 2.2, 2.3 (Place, Upgrade, Tower Variety) |
| 7 | 3.1 (Waves of Enemies) |
| 8 | 4.2 (Responsive Vim Controls) |
| 9 | 4.1, 4.3 (Clear Display, Visual Feedback) |
| 10 | 1.1, 1.2, 1.3 (Start/Play, Win/Lose, Pause) |
| 11 | (quality — all stories) |
| 12 | (documentation) |
