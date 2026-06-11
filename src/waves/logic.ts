import type { EnemyType, SpawnEntry, WaveState, Enemy } from '../core/types.js';

function getEnemyTypes(waveNumber: number): EnemyType[] {
  if (waveNumber >= 16) return ['normal', 'fast', 'tank', 'swarm'];
  if (waveNumber >= 11) return ['normal', 'fast', 'tank'];
  if (waveNumber >= 6) return ['normal', 'fast'];
  return ['normal'];
}

export function buildSpawnQueue(waveNumber: number): SpawnEntry[] {
  const types = getEnemyTypes(waveNumber);
  const baseCount = 5 + Math.floor(waveNumber * 0.5);
  const baseInterval = Math.max(5, 12 - waveNumber);
  const queue: SpawnEntry[] = [];

  let remaining = baseCount;
  let tickOffset = 0;

  while (remaining > 0) {
    const enemyType = types[Math.floor(Math.random() * types.length)]!;
    queue.push({ enemyType, ticksUntilSpawn: tickOffset });
    tickOffset += baseInterval;
    remaining--;
  }

  return queue;
}

export function isWaveSpawnComplete(wave: WaveState): boolean {
  return wave.spawnQueue.length === 0;
}

export function isWaveCleared(wave: WaveState, enemies: Enemy[]): boolean {
  return isWaveSpawnComplete(wave) && enemies.length === 0;
}

export function nextWave(wave: WaveState): WaveState {
  const next = wave.currentWave + 1;
  return {
    ...wave,
    currentWave: next,
    spawnQueue: buildSpawnQueue(next),
    spawnTimer: 30,
    started: false,
  };
}
