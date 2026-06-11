import type { EnemyConfig, EnemyType } from '../core/types.js';

export const ENEMY_CONFIGS: Record<EnemyType, EnemyConfig> = {
  normal: { type: 'normal', name: 'Normal', symbol: 'o', color: 'green', baseHp: 30, speed: 0.08, reward: 10 },
  fast: { type: 'fast', name: 'Fast', symbol: 'f', color: 'yellow', baseHp: 15, speed: 0.16, reward: 8 },
  tank: { type: 'tank', name: 'Tank', symbol: 'O', color: 'red', baseHp: 80, speed: 0.04, reward: 25 },
  swarm: { type: 'swarm', name: 'Swarm', symbol: '.', color: 'magenta', baseHp: 10, speed: 0.10, reward: 5 },
};
