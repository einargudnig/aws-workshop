import type { GameState, TowerType } from '../core/types.js';
import { TOWER_CONFIGS } from '../towers/configs.js';

export function renderStatusBar(state: GameState): string {
  const { economy, wave, phase } = state;
  const phaseLabel = phase === 'paused' ? '{yellow-fg}PAUSED{/yellow-fg}' : '';
  return ` Wave: ${wave.currentWave}/${wave.totalWaves}  💰 ${economy.currency}  ❤️  ${economy.lives}  Score: ${economy.score}  ${phaseLabel}`;
}

export function renderTowerPanel(state: GameState): string {
  const types: TowerType[] = ['basic', 'sniper', 'splash', 'slow', 'rapid'];
  const lines = types.map((t, i) => {
    const c = TOWER_CONFIGS[t];
    const selected = state.cursor.selectedTower === t ? '>' : ' ';
    return `${selected}${i + 1}) ${c.symbol} ${c.name.padEnd(7)} $${c.cost}`;
  });
  return lines.join('\n');
}

export function renderHelp(): string {
  return [
    '{bold}Controls:{/bold}',
    ' h/j/k/l  Move cursor',
    ' 1-5      Select tower',
    ' Enter    Place tower',
    ' u        Upgrade tower',
    ' p        Pause/Resume',
    ' q        Quit',
    ' ?        Toggle help',
  ].join('\n');
}

export function renderGameOver(state: GameState): string {
  if (state.phase === 'won') {
    return [
      '{green-fg}{bold}  YOU WIN!  {/bold}{/green-fg}',
      '',
      `  Final Score: ${state.economy.score}`,
      `  Waves Cleared: ${state.wave.totalWaves}`,
      '',
      '  Press q to quit',
    ].join('\n');
  }
  return [
    '{red-fg}{bold}  GAME OVER  {/bold}{/red-fg}',
    '',
    `  Score: ${state.economy.score}`,
    `  Wave Reached: ${state.wave.currentWave}`,
    '',
    '  Press q to quit',
  ].join('\n');
}
