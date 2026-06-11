export type Position = { x: number; y: number };

export type TileType = 'path' | 'buildable' | 'blocked';

export type GameMap = {
  width: number;
  height: number;
  tiles: TileType[][];
  path: Position[];
};

export type TowerType = 'basic' | 'sniper' | 'splash' | 'slow' | 'rapid';

export type TowerConfig = {
  type: TowerType;
  name: string;
  symbol: string;
  color: string;
  cost: number;
  damage: number;
  range: number;
  fireRate: number;
  splash: number;
  slowFactor: number;
  upgradeCost: number[];
  upgradeMultiplier: number;
};

export type Tower = {
  id: number;
  type: TowerType;
  pos: Position;
  level: number;
  cooldown: number;
};

export type EnemyType = 'normal' | 'fast' | 'tank' | 'swarm';

export type EnemyConfig = {
  type: EnemyType;
  name: string;
  symbol: string;
  color: string;
  baseHp: number;
  speed: number;
  reward: number;
};

export type Enemy = {
  id: number;
  type: EnemyType;
  hp: number;
  maxHp: number;
  pathProgress: number;
  slowedUntil: number;
};

export type WaveSpawn = {
  enemyType: EnemyType;
  count: number;
  interval: number;
};

export type WaveDefinition = {
  waveNumber: number;
  spawns: WaveSpawn[];
  delay: number;
};

export type SpawnEntry = {
  enemyType: EnemyType;
  ticksUntilSpawn: number;
};

export type WaveState = {
  currentWave: number;
  totalWaves: number;
  spawnQueue: SpawnEntry[];
  spawnTimer: number;
  started: boolean;
};

export type EconomyState = {
  currency: number;
  lives: number;
  score: number;
};

export type CursorState = {
  pos: Position;
  selectedTower: TowerType | null;
};

export type EffectType = 'attack' | 'kill' | 'damage';

export type Effect = {
  type: EffectType;
  pos: Position;
  ttl: number;
};

export type GameCommand =
  | { type: 'move'; dir: 'up' | 'down' | 'left' | 'right' }
  | { type: 'selectTower'; tower: TowerType }
  | { type: 'place' }
  | { type: 'upgrade' }
  | { type: 'pause' }
  | { type: 'quit' }
  | { type: 'help' };

export type GamePhase = 'playing' | 'paused' | 'won' | 'lost';

export type GameState = {
  map: GameMap;
  towers: Tower[];
  enemies: Enemy[];
  wave: WaveState;
  economy: EconomyState;
  cursor: CursorState;
  effects: Effect[];
  phase: GamePhase;
  tick: number;
  nextId: number;
  showHelp: boolean;
};
