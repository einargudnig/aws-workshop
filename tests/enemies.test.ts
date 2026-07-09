import { describe, it, expect } from 'vitest';
import { createEnemy, moveEnemies, processEscapedEnemies } from '../src/enemies/logic.js';
import type { Enemy } from '../src/core/types.js';
import { createInitialState } from '../src/core/initializer.js';

describe('enemies', () => {
  it('createEnemy scales HP by wave number', () => {
    const state = createInitialState();
    const { enemy: e1 } = createEnemy(state, 'normal', 1);
    const { enemy: e5 } = createEnemy(state, 'normal', 5);
    expect(e1.hp).toBe(30);
    expect(e5.hp).toBe(Math.round(30 * (1 + 0.15 * 4)));
  });

  it('moveEnemies advances pathProgress', () => {
    const enemies: Enemy[] = [{ id: 1, type: 'normal', hp: 30, maxHp: 30, pathProgress: 0, slowedUntil: 0 }];
    const moved = moveEnemies(enemies, 10, 1);
    expect(moved[0]!.pathProgress).toBeGreaterThan(0);
  });

  it('processEscapedEnemies removes enemies past path end', () => {
    const state = createInitialState();
    const pathLen = state.map.path.length;
    const escaped: Enemy = { id: 1, type: 'normal', hp: 10, maxHp: 30, pathProgress: pathLen, slowedUntil: 0 };
    const result = processEscapedEnemies({ ...state, enemies: [escaped] });
    expect(result.enemies).toHaveLength(0);
    expect(result.economy.lives).toBe(19);
  });
});
