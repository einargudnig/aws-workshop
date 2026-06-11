import type { TowerConfig, TowerType } from '../core/types.js';

export const TOWER_CONFIGS: Record<TowerType, TowerConfig> = {
  basic: { type: 'basic', name: 'Basic', symbol: 'T', color: 'white', cost: 15, damage: 10, range: 3, fireRate: 8, splash: 0, slowFactor: 1.0, upgradeCost: [20, 40], upgradeMultiplier: 1.5 },
  sniper: { type: 'sniper', name: 'Sniper', symbol: 'S', color: 'blue', cost: 30, damage: 40, range: 6, fireRate: 20, splash: 0, slowFactor: 1.0, upgradeCost: [20, 40], upgradeMultiplier: 1.5 },
  splash: { type: 'splash', name: 'Splash', symbol: 'X', color: 'red', cost: 25, damage: 8, range: 2, fireRate: 12, splash: 1.5, slowFactor: 1.0, upgradeCost: [20, 40], upgradeMultiplier: 1.5 },
  slow: { type: 'slow', name: 'Slow', symbol: '~', color: 'cyan', cost: 20, damage: 0, range: 3, fireRate: 10, splash: 0, slowFactor: 0.5, upgradeCost: [20, 40], upgradeMultiplier: 1.5 },
  rapid: { type: 'rapid', name: 'Rapid', symbol: 'R', color: 'yellow', cost: 20, damage: 5, range: 2, fireRate: 3, splash: 0, slowFactor: 1.0, upgradeCost: [20, 40], upgradeMultiplier: 1.5 },
};
