# Component Methods

## GameState

```typescript
type GameState = {
  map: GameMap;
  towers: Tower[];
  enemies: Enemy[];
  wave: WaveState;
  economy: EconomyState;
  cursor: CursorState;
  phase: 'playing' | 'paused' | 'won' | 'lost';
  tick: number;
}
```

---

## Map

```typescript
// Create initial map from a level definition
createMap(level: LevelDefinition): GameMap

// Query if a tile is buildable (not path, not occupied)
isBuildable(map: GameMap, towers: Tower[], pos: Position): boolean

// Get the path as ordered positions
getPath(map: GameMap): Position[]
```

---

## Towers

```typescript
// Get tower type config by ID
getTowerConfig(type: TowerType): TowerConfig

// Place a new tower (returns updated towers array + updated economy)
placeTower(state: GameState, type: TowerType, pos: Position): GameState

// Upgrade an existing tower
upgradeTower(state: GameState, pos: Position): GameState

// Process all tower attacks for one tick (targeting + damage)
processTowerAttacks(towers: Tower[], enemies: Enemy[], tick: number): { towers: Tower[]; enemies: Enemy[]; effects: Effect[] }
```

---

## Enemies

```typescript
// Spawn enemies based on current wave schedule
spawnEnemies(wave: WaveState, tick: number): Enemy[]

// Move all enemies along the path by their speed
moveEnemies(enemies: Enemy[], path: Position[], deltaTime: number): Enemy[]

// Remove dead enemies, return rewards
processDeadEnemies(enemies: Enemy[]): { alive: Enemy[]; rewards: number }

// Detect enemies that reached the exit
processEscapedEnemies(enemies: Enemy[], pathLength: number): { remaining: Enemy[]; escaped: number }
```

---

## Waves

```typescript
// Get wave definition for a given wave number
getWaveDefinition(waveNumber: number): WaveDefinition

// Check if current wave spawning is complete
isWaveSpawnComplete(wave: WaveState): boolean

// Check if wave is fully cleared (no enemies alive, spawn complete)
isWaveCleared(wave: WaveState, enemies: Enemy[]): boolean

// Advance to next wave
nextWave(wave: WaveState): WaveState
```

---

## Economy

```typescript
// Check if player can afford a cost
canAfford(economy: EconomyState, cost: number): boolean

// Deduct cost from currency
spend(economy: EconomyState, cost: number): EconomyState

// Add reward to currency and score
reward(economy: EconomyState, amount: number): EconomyState

// Deduct lives when enemies escape
loseLife(economy: EconomyState, count: number): EconomyState
```

---

## Input

```typescript
// Process a keypress into a game command
handleKeypress(key: KeypressEvent): GameCommand | null

// Apply a game command to state
applyCommand(state: GameState, command: GameCommand): GameState
```

---

## Renderer

```typescript
// Render full game state to terminal
render(state: GameState): void

// Render specific overlay (help, pause, game over)
renderOverlay(overlay: OverlayType, state: GameState): void
```
