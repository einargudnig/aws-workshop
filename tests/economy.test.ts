import { describe, it, expect } from 'vitest';
import { canAfford, spend, reward, loseLife } from '../src/economy/logic.js';
import type { EconomyState } from '../src/core/types.js';

const base: EconomyState = { currency: 100, lives: 20, score: 0 };

describe('economy', () => {
  it('canAfford returns true when currency sufficient', () => {
    expect(canAfford(base, 100)).toBe(true);
    expect(canAfford(base, 50)).toBe(true);
  });

  it('canAfford returns false when currency insufficient', () => {
    expect(canAfford(base, 101)).toBe(false);
  });

  it('spend reduces currency', () => {
    expect(spend(base, 30).currency).toBe(70);
  });

  it('reward increases currency and score', () => {
    const result = reward(base, 10);
    expect(result.currency).toBe(110);
    expect(result.score).toBe(10);
  });

  it('loseLife reduces lives', () => {
    expect(loseLife(base, 3).lives).toBe(17);
  });
});
