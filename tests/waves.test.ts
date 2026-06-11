import { describe, it, expect } from 'vitest';
import { buildSpawnQueue, isWaveCleared, nextWave } from '../src/waves/logic.js';
import type { WaveState } from '../src/core/types.js';

describe('waves', () => {
  it('buildSpawnQueue returns non-empty queue', () => {
    const queue = buildSpawnQueue(1);
    expect(queue.length).toBeGreaterThan(0);
  });

  it('buildSpawnQueue scales count with wave number', () => {
    const q1 = buildSpawnQueue(1);
    const q10 = buildSpawnQueue(10);
    expect(q10.length).toBeGreaterThan(q1.length);
  });

  it('isWaveCleared is true when no enemies and queue empty', () => {
    const wave: WaveState = { currentWave: 1, totalWaves: 20, spawnQueue: [], spawnTimer: 0, started: true };
    expect(isWaveCleared(wave, [])).toBe(true);
  });

  it('isWaveCleared is false when enemies exist', () => {
    const wave: WaveState = { currentWave: 1, totalWaves: 20, spawnQueue: [], spawnTimer: 0, started: true };
    const enemies = [{ id: 1, type: 'normal' as const, hp: 10, maxHp: 30, pathProgress: 5, slowedUntil: 0 }];
    expect(isWaveCleared(wave, enemies)).toBe(false);
  });

  it('nextWave increments wave number', () => {
    const wave: WaveState = { currentWave: 1, totalWaves: 20, spawnQueue: [], spawnTimer: 0, started: true };
    const next = nextWave(wave);
    expect(next.currentWave).toBe(2);
    expect(next.spawnQueue.length).toBeGreaterThan(0);
  });
});
