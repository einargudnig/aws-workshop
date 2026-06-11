import blessed from 'blessed';
import type { GameState } from '../core/types.js';
import { renderGrid } from './grid.js';
import { renderStatusBar, renderTowerPanel, renderHelp, renderGameOver } from './ui.js';

export type Screen = blessed.Widgets.Screen;

export interface RenderElements {
  screen: Screen;
  gridBox: blessed.Widgets.BoxElement;
  statusBox: blessed.Widgets.BoxElement;
  panelBox: blessed.Widgets.BoxElement;
  overlayBox: blessed.Widgets.BoxElement;
}

export function createScreen(): RenderElements {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'ASCII Tower Defense',
    fullUnicode: true,
    input: process.stdin,
    output: process.stdout,
  });

  const gridBox = blessed.box({
    top: 1,
    left: 0,
    width: '75%',
    height: '85%',
    tags: true,
    border: { type: 'line' },
    label: ' Map ',
  });

  const statusBox = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    tags: true,
  });

  const panelBox = blessed.box({
    top: 1,
    right: 0,
    width: '25%',
    height: '85%',
    tags: true,
    border: { type: 'line' },
    label: ' Towers ',
  });

  const overlayBox = blessed.box({
    top: 'center',
    left: 'center',
    width: 30,
    height: 12,
    tags: true,
    border: { type: 'line' },
    hidden: true,
  });

  screen.append(statusBox);
  screen.append(gridBox);
  screen.append(panelBox);
  screen.append(overlayBox);

  return { screen, gridBox, statusBox, panelBox, overlayBox };
}

export function render(elements: RenderElements, state: GameState): void {
  const { gridBox, statusBox, panelBox, overlayBox, screen } = elements;

  statusBox.setContent(renderStatusBar(state));
  gridBox.setContent(renderGrid(state));
  panelBox.setContent(renderTowerPanel(state));

  if (state.phase === 'won' || state.phase === 'lost') {
    overlayBox.setContent(renderGameOver(state));
    overlayBox.show();
  } else if (state.showHelp) {
    overlayBox.setContent(renderHelp());
    overlayBox.show();
  } else {
    overlayBox.hide();
  }

  screen.render();
}
