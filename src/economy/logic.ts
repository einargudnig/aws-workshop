import type { EconomyState } from '../core/types.js';

export function canAfford(economy: EconomyState, cost: number): boolean {
  return economy.currency >= cost;
}

export function spend(economy: EconomyState, cost: number): EconomyState {
  return { ...economy, currency: economy.currency - cost };
}

export function reward(economy: EconomyState, amount: number): EconomyState {
  return { ...economy, currency: economy.currency + amount, score: economy.score + amount };
}

export function loseLife(economy: EconomyState, count: number): EconomyState {
  return { ...economy, lives: economy.lives - count };
}
