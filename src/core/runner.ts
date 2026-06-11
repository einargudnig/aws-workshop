import type { GameState } from './types.js';
import { createInitialState } from './initializer.js';
import { gameTick } from './game-loop.js';
import { handleKeypress, applyCommand } from '../input/handler.js';
import { createScreen, render } from '../rendering/renderer.js';

const TICK_MS = 100;

export function startGame(): void {
  let state: GameState = createInitialState();
  const elements = createScreen();
  const { screen } = elements;

  screen.enableKeys();
  screen.enableInput();

  screen.on('keypress', (ch: string | undefined, key: { name?: string; full?: string } | undefined) => {
    const cmd = handleKeypress(ch, key);
    if (!cmd) return;
    if (cmd.type === 'quit') {
      screen.destroy();
      process.exit(0);
    }
    state = applyCommand(state, cmd);
    render(elements, state);
  });

  const tickInterval = setInterval(() => {
    state = gameTick(state);
    render(elements, state);
  }, TICK_MS);

  screen.on('destroy', () => {
    clearInterval(tickInterval);
  });

  render(elements, state);
}
