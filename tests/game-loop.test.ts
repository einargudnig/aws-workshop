import { describe, it, expect } from 'vitest';
import { gameTick } from '../src/core/game-loop.js';
import { createInitialState } from '../src/core/initializer.js';

describe('gameTick', () => {
  it('increments tick counter', () => {
    const state = createInitialState();
    const next = gameTick(state);
    expect(next.tick).toBe(1);
  });

  it('does not advance when paused', () => {
    const state = { ...createInitialState(), phase: 'paused' as const };
    const next = gameTick(state);
    expect(next.tick).toBe(0);
  });

  it('does not advance when game is won', () => {
    const state = { ...createInitialState(), phase: 'won' as const };
    const next = gameTick(state);
    expect(next.tick).toBe(0);
  });

  it('spawns enemies after initial delay', () => {
    let state = createInitialState();
    // Run through initial delay (20 ticks) + 1
    for (let i = 0; i < 22; i++) {
      state = gameTick(state);
    }
    expect(state.enemies.length).toBeGreaterThan(0);
  });
});
