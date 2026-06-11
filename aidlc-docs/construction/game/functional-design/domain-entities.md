# Domain Entities

## Position
```typescript
type Position = { x: number; y: number }
```

## Tile
```typescript
type TileType = 'path' | 'buildable' | 'blocked'
```

## GameMap
```typescript
type GameMap = {
  width: number;
  height: number;
  tiles: TileType[][];       // 2D grid
  path: Position[];          // ordered path from entrance to exit
}
```

## TowerType
```typescript
type TowerType = 'basic' | 'sniper' | 'splash' | 'slow' | 'rapid'
```

## TowerConfig
```typescript
type TowerConfig = {
  type: TowerType;
  name: string;
  symbol: string;           // ASCII character
  color: string;            // ANSI color name
  cost: number;
  damage: number;
  range: number;            // tiles
  fireRate: number;         // ticks between shots
  splash: number;           // 0 = single target, >0 = AoE radius
  slowFactor: number;       // 1.0 = no slow, 0.5 = half speed
  upgradeCost: number[];    // cost per upgrade level [lvl1→2, lvl2→3]
  upgradeMultiplier: number; // stat multiplier per level
}
```

## Tower (instance)
```typescript
type Tower = {
  id: number;
  type: TowerType;
  pos: Position;
  level: number;            // 1, 2, or 3
  cooldown: number;         // ticks until next shot (0 = ready)
}
```

## EnemyType
```typescript
type EnemyType = 'normal' | 'fast' | 'tank' | 'swarm'
```

## EnemyConfig
```typescript
type EnemyConfig = {
  type: EnemyType;
  name: string;
  symbol: string;
  color: string;
  baseHp: number;
  speed: number;            // path steps per tick (fractional OK)
  reward: number;           // currency on kill
}
```

## Enemy (instance)
```typescript
type Enemy = {
  id: number;
  type: EnemyType;
  hp: number;
  maxHp: number;
  pathProgress: number;     // fractional index along path (0.0 = start)
  slowedUntil: number;      // tick number when slow expires
}
```

## WaveDefinition
```typescript
type WaveSpawn = {
  enemyType: EnemyType;
  count: number;
  interval: number;         // ticks between each spawn
}

type WaveDefinition = {
  waveNumber: number;
  spawns: WaveSpawn[];      // groups to spawn
  delay: number;            // ticks before wave starts
}
```

## WaveState
```typescript
type WaveState = {
  currentWave: number;      // 1-based
  totalWaves: number;       // 20
  spawnQueue: SpawnEntry[]; // remaining enemies to spawn
  spawnTimer: number;       // ticks until next spawn
  started: boolean;         // wave has started spawning
}

type SpawnEntry = {
  enemyType: EnemyType;
  ticksUntilSpawn: number;
}
```

## EconomyState
```typescript
type EconomyState = {
  currency: number;
  lives: number;
  score: number;
}
```

## CursorState
```typescript
type CursorState = {
  pos: Position;
  selectedTower: TowerType | null;
}
```

## Effect (visual)
```typescript
type Effect = {
  type: 'attack' | 'kill' | 'damage';
  pos: Position;
  ttl: number;              // ticks remaining to display
}
```

## GameCommand
```typescript
type GameCommand =
  | { type: 'move'; dir: 'up' | 'down' | 'left' | 'right' }
  | { type: 'selectTower'; tower: TowerType }
  | { type: 'place' }
  | { type: 'upgrade' }
  | { type: 'pause' }
  | { type: 'quit' }
  | { type: 'help' }
```

## GameState
```typescript
type GameState = {
  map: GameMap;
  towers: Tower[];
  enemies: Enemy[];
  wave: WaveState;
  economy: EconomyState;
  cursor: CursorState;
  effects: Effect[];
  phase: 'playing' | 'paused' | 'won' | 'lost';
  tick: number;
  nextId: number;           // auto-increment ID for towers/enemies
}
```
