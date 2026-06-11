import type { GameCommand, GameState, TowerType } from '../core/types.js';
import { placeTower, upgradeTower } from '../towers/logic.js';

const TOWER_KEYS: Record<string, TowerType> = {
  '1': 'basic',
  '2': 'sniper',
  '3': 'splash',
  '4': 'slow',
  '5': 'rapid',
};

export function handleKeypress(ch: string | undefined, key: { name?: string } | undefined): GameCommand | null {
  const name = key?.name ?? ch;
  if (!name && !ch) return null;
  const k = name ?? ch ?? '';

  switch (k) {
    case 'h': case 'left': return { type: 'move', dir: 'left' };
    case 'j': case 'down': return { type: 'move', dir: 'down' };
    case 'k': case 'up': return { type: 'move', dir: 'up' };
    case 'l': case 'right': return { type: 'move', dir: 'right' };
    case 'return': case 'space': return { type: 'place' };
    case 'u': return { type: 'upgrade' };
    case 'p': return { type: 'pause' };
    case 'q': return { type: 'quit' };
    case '?': return { type: 'help' };
    default:
      if (ch && TOWER_KEYS[ch]) return { type: 'selectTower', tower: TOWER_KEYS[ch]! };
      return null;
  }
}

export function applyCommand(state: GameState, cmd: GameCommand): GameState {
  switch (cmd.type) {
    case 'move': {
      const { pos } = state.cursor;
      const dx = cmd.dir === 'left' ? -1 : cmd.dir === 'right' ? 1 : 0;
      const dy = cmd.dir === 'up' ? -1 : cmd.dir === 'down' ? 1 : 0;
      const nx = Math.max(0, Math.min(state.map.width - 1, pos.x + dx));
      const ny = Math.max(0, Math.min(state.map.height - 1, pos.y + dy));
      return { ...state, cursor: { ...state.cursor, pos: { x: nx, y: ny } } };
    }
    case 'selectTower':
      return { ...state, cursor: { ...state.cursor, selectedTower: cmd.tower } };
    case 'place': {
      if (state.phase !== 'playing' || !state.cursor.selectedTower) return state;
      const result = placeTower(state, state.cursor.selectedTower, state.cursor.pos);
      return result ?? state;
    }
    case 'upgrade': {
      if (state.phase !== 'playing') return state;
      const result = upgradeTower(state, state.cursor.pos);
      return result ?? state;
    }
    case 'pause':
      if (state.phase === 'playing') return { ...state, phase: 'paused' };
      if (state.phase === 'paused') return { ...state, phase: 'playing' };
      return state;
    case 'help':
      return { ...state, showHelp: !state.showHelp };
    case 'quit':
      return state; // handled at runner level
  }
}
