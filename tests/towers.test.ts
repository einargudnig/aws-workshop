import { describe, it, expect } from 'vitest';
import { placeTower, upgradeTower } from '../src/towers/logic.js';
import { createInitialState } from '../src/core/initializer.js';

describe('towers', () => {
  it('placeTower succeeds on buildable tile with enough currency', () => {
    const state = createInitialState();
    // Find a buildable tile
    let buildablePos = { x: 5, y: 5 };
    for (let y = 0; y < state.map.height; y++) {
      for (let x = 0; x < state.map.width; x++) {
        if (state.map.tiles[y]![x] === 'buildable') {
          buildablePos = { x, y };
          break;
        }
      }
    }
    const result = placeTower(state, 'basic', buildablePos);
    expect(result).not.toBeNull();
    expect(result!.towers).toHaveLength(1);
    expect(result!.economy.currency).toBe(100 - 15);
  });

  it('placeTower fails on path tile', () => {
    const state = createInitialState();
    const pathTile = state.map.path[5]!;
    const result = placeTower(state, 'basic', pathTile);
    expect(result).toBeNull();
  });

  it('placeTower fails with insufficient currency', () => {
    const state = { ...createInitialState(), economy: { currency: 5, lives: 20, score: 0 } };
    const result = placeTower(state, 'basic', { x: 5, y: 5 });
    expect(result).toBeNull();
  });

  it('upgradeTower increases level and deducts cost', () => {
    const state = createInitialState();
    let buildablePos = { x: 5, y: 5 };
    for (let y = 0; y < state.map.height; y++) {
      for (let x = 0; x < state.map.width; x++) {
        if (state.map.tiles[y]![x] === 'buildable') { buildablePos = { x, y }; break; }
      }
    }
    const placed = placeTower(state, 'basic', buildablePos)!;
    const upgraded = upgradeTower(placed, buildablePos);
    expect(upgraded).not.toBeNull();
    expect(upgraded!.towers[0]!.level).toBe(2);
    expect(upgraded!.economy.currency).toBe(placed.economy.currency - 20);
  });
});
