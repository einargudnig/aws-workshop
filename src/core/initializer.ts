import type { GameState } from './types.js';
import { createLevel1 } from '../map/levels.js';
import { buildSpawnQueue } from '../waves/logic.js';

export function createInitialState(): GameState {
  const map = createLevel1();
  return {
    map,
    towers: [],
    enemies: [],
    wave: {
      currentWave: 1,
      totalWaves: 20,
      spawnQueue: buildSpawnQueue(1),
      spawnTimer: 20,
      started: false,
    },
    economy: { currency: 100, lives: 20, score: 0 },
    cursor: {
      pos: { x: Math.floor(map.width / 2), y: Math.floor(map.height / 2) },
      selectedTower: 'basic',
    },
    effects: [],
    phase: 'playing',
    tick: 0,
    nextId: 1,
    showHelp: false,
  };
}
