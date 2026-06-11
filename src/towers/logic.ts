import type { GameState, Tower, TowerType, Enemy, Effect, Position } from '../core/types.js';
import { TOWER_CONFIGS } from './configs.js';
import { isBuildable } from '../map/logic.js';
import { positionAtProgress } from '../map/logic.js';
import { canAfford, spend } from '../economy/logic.js';

function getEffectiveStat(base: number, level: number, multiplier: number): number {
  return base * Math.pow(multiplier, level - 1);
}

function distance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function placeTower(state: GameState, type: TowerType, pos: Position): GameState | null {
  const config = TOWER_CONFIGS[type];
  if (!isBuildable(state.map, state.towers, pos)) return null;
  if (!canAfford(state.economy, config.cost)) return null;

  const tower: Tower = {
    id: state.nextId,
    type,
    pos,
    level: 1,
    cooldown: 0,
  };

  return {
    ...state,
    towers: [...state.towers, tower],
    economy: spend(state.economy, config.cost),
    nextId: state.nextId + 1,
  };
}

export function upgradeTower(state: GameState, pos: Position): GameState | null {
  const idx = state.towers.findIndex(t => t.pos.x === pos.x && t.pos.y === pos.y);
  if (idx === -1) return null;

  const tower = state.towers[idx]!;
  if (tower.level >= 3) return null;

  const config = TOWER_CONFIGS[tower.type];
  const cost = config.upgradeCost[tower.level - 1]!;
  if (!canAfford(state.economy, cost)) return null;

  const upgraded = { ...tower, level: tower.level + 1 };
  const towers = [...state.towers];
  towers[idx] = upgraded;

  return { ...state, towers, economy: spend(state.economy, cost) };
}

export function processTowerAttacks(state: GameState): GameState {
  let enemies = [...state.enemies];
  const towers = state.towers.map(t => ({ ...t }));
  const effects: Effect[] = [...state.effects];

  for (let i = 0; i < towers.length; i++) {
    const tower = towers[i]!;
    if (tower.cooldown > 0) {
      tower.cooldown--;
      continue;
    }

    const config = TOWER_CONFIGS[tower.type];
    const effectiveRange = getEffectiveStat(config.range, tower.level, 1); // range doesn't scale
    const effectiveDamage = getEffectiveStat(config.damage, tower.level, config.upgradeMultiplier);

    // Find target: enemy with highest pathProgress within range
    let target: Enemy | null = null;
    let targetIdx = -1;
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j]!;
      const enemyPos = positionAtProgress(state.map.path, enemy.pathProgress);
      if (distance(tower.pos, enemyPos) <= effectiveRange) {
        if (!target || enemy.pathProgress > target.pathProgress) {
          target = enemy;
          targetIdx = j;
        }
      }
    }

    if (!target || targetIdx === -1) continue;

    tower.cooldown = config.fireRate;
    const targetPos = positionAtProgress(state.map.path, target.pathProgress);

    if (config.splash > 0) {
      // Splash damage to all enemies near target
      enemies = enemies.map(e => {
        const ePos = positionAtProgress(state.map.path, e.pathProgress);
        if (distance(targetPos, ePos) <= config.splash) {
          return { ...e, hp: e.hp - effectiveDamage };
        }
        return e;
      });
    } else if (config.damage > 0) {
      // Single target damage
      enemies[targetIdx] = { ...target, hp: target.hp - effectiveDamage };
    }

    // Apply slow
    if (config.slowFactor < 1) {
      enemies[targetIdx] = { ...enemies[targetIdx]!, slowedUntil: state.tick + config.fireRate };
    }

    effects.push({ type: 'attack', pos: targetPos, ttl: 2 });
  }

  return { ...state, towers, enemies, effects };
}
