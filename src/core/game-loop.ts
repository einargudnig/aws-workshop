import type { GameState } from './types.js';
import { createEnemy, moveEnemies, processDeadEnemies, processEscapedEnemies } from '../enemies/logic.js';
import { processTowerAttacks } from '../towers/logic.js';
import { isWaveCleared, nextWave } from '../waves/logic.js';
import { TOWER_CONFIGS } from '../towers/configs.js';

export function gameTick(state: GameState): GameState {
  if (state.phase !== 'playing') return state;

  let s: GameState = { ...state, tick: state.tick + 1 };

  // Spawn enemies
  s = spawnStep(s);

  // Move enemies (using slowest active slow tower factor)
  const slowFactor = getSlowFactor(s);
  s = { ...s, enemies: moveEnemies(s.enemies, s.tick, slowFactor) };

  // Tower attacks
  s = processTowerAttacks(s);

  // Process dead enemies
  s = processDeadEnemies(s);

  // Process escaped enemies
  s = processEscapedEnemies(s);

  // Check win/lose
  s = checkWinLose(s);

  // Check wave complete
  s = checkWaveComplete(s);

  // Decay effects
  s = { ...s, effects: s.effects.filter(e => e.ttl > 1).map(e => ({ ...e, ttl: e.ttl - 1 })) };

  return s;
}

function spawnStep(state: GameState): GameState {
  const wave = state.wave;
  if (wave.spawnQueue.length === 0) return state;

  if (!wave.started) {
    if (wave.spawnTimer > 0) {
      return { ...state, wave: { ...wave, spawnTimer: wave.spawnTimer - 1 } };
    }
    return { ...state, wave: { ...wave, started: true, spawnTimer: 0 } };
  }

  if (wave.spawnTimer > 0) {
    return { ...state, wave: { ...wave, spawnTimer: wave.spawnTimer - 1 } };
  }

  const [entry, ...rest] = wave.spawnQueue;
  if (!entry) return state;

  const { enemy, nextId } = createEnemy(state, entry.enemyType, wave.currentWave);
  const nextEntry = rest[0];
  const nextTimer = nextEntry ? nextEntry.ticksUntilSpawn - entry.ticksUntilSpawn : 0;

  return {
    ...state,
    enemies: [...state.enemies, enemy],
    wave: { ...wave, spawnQueue: rest, spawnTimer: Math.max(nextTimer, 5) },
    nextId,
  };
}

function getSlowFactor(state: GameState): number {
  for (const tower of state.towers) {
    const config = TOWER_CONFIGS[tower.type];
    if (config.slowFactor < 1) return config.slowFactor;
  }
  return 1;
}

function checkWinLose(state: GameState): GameState {
  if (state.economy.lives <= 0) return { ...state, phase: 'lost' };
  if (state.wave.currentWave >= state.wave.totalWaves && isWaveCleared(state.wave, state.enemies)) {
    return { ...state, phase: 'won' };
  }
  return state;
}

function checkWaveComplete(state: GameState): GameState {
  if (state.phase !== 'playing') return state;
  if (state.wave.currentWave >= state.wave.totalWaves) return state;
  if (isWaveCleared(state.wave, state.enemies)) {
    return { ...state, wave: nextWave(state.wave) };
  }
  return state;
}
