import type { Enemy, EnemyType, GameState, Effect } from '../core/types.js';
import { ENEMY_CONFIGS } from './configs.js';
import { reward, loseLife } from '../economy/logic.js';

export function createEnemy(state: GameState, enemyType: EnemyType, waveNumber: number): { enemy: Enemy; nextId: number } {
  const config = ENEMY_CONFIGS[enemyType];
  const scaledHp = Math.round(config.baseHp * (1 + 0.15 * (waveNumber - 1)));
  return {
    enemy: {
      id: state.nextId,
      type: enemyType,
      hp: scaledHp,
      maxHp: scaledHp,
      pathProgress: 0,
      slowedUntil: 0,
    },
    nextId: state.nextId + 1,
  };
}

export function moveEnemies(enemies: Enemy[], tick: number, slowFactor: number): Enemy[] {
  return enemies.map(e => {
    const config = ENEMY_CONFIGS[e.type];
    const speed = tick < e.slowedUntil ? config.speed * slowFactor : config.speed;
    return { ...e, pathProgress: e.pathProgress + speed };
  });
}

export function processDeadEnemies(state: GameState): GameState {
  const alive: Enemy[] = [];
  const effects: Effect[] = [...state.effects];
  let economy = state.economy;

  for (const enemy of state.enemies) {
    if (enemy.hp <= 0) {
      const config = ENEMY_CONFIGS[enemy.type];
      economy = reward(economy, config.reward);
      effects.push({ type: 'kill', pos: { x: 0, y: 0 }, ttl: 3 });
    } else {
      alive.push(enemy);
    }
  }
  return { ...state, enemies: alive, economy, effects };
}

export function processEscapedEnemies(state: GameState): GameState {
  const pathLength = state.map.path.length;
  const remaining: Enemy[] = [];
  let escaped = 0;

  for (const enemy of state.enemies) {
    if (enemy.pathProgress >= pathLength - 1) {
      escaped++;
    } else {
      remaining.push(enemy);
    }
  }

  if (escaped === 0) return state;
  return { ...state, enemies: remaining, economy: loseLife(state.economy, escaped) };
}
