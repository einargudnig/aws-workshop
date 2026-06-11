import type { GameState } from '../core/types.js';
import { positionAtProgress } from '../map/logic.js';
import { TOWER_CONFIGS } from '../towers/configs.js';
import { ENEMY_CONFIGS } from '../enemies/configs.js';

const COLORS: Record<string, string> = {
  white: '{white-fg}', blue: '{blue-fg}', red: '{red-fg}',
  cyan: '{cyan-fg}', yellow: '{yellow-fg}', green: '{green-fg}',
  magenta: '{magenta-fg}',
};

function colorize(text: string, color: string): string {
  const tag = COLORS[color] ?? '{white-fg}';
  const closeTag = tag.replace('{', '{/');
  return `${tag}${text}${closeTag}`;
}

export function renderGrid(state: GameState): string {
  const { map, towers, enemies, cursor, effects } = state;
  const grid: string[][] = [];

  // Base tiles
  for (let y = 0; y < map.height; y++) {
    grid[y] = [];
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[y]![x]!;
      if (tile === 'path') grid[y]![x] = colorize('·', 'white');
      else if (tile === 'blocked') grid[y]![x] = colorize('█', 'white');
      else grid[y]![x] = ' ';
    }
  }

  // Towers
  for (const tower of towers) {
    const config = TOWER_CONFIGS[tower.type];
    const lvlIndicator = tower.level > 1 ? String(tower.level) : config.symbol;
    grid[tower.pos.y]![tower.pos.x] = colorize(lvlIndicator, config.color);
  }

  // Enemies
  for (const enemy of enemies) {
    const pos = positionAtProgress(map.path, enemy.pathProgress);
    if (pos.y >= 0 && pos.y < map.height && pos.x >= 0 && pos.x < map.width) {
      const config = ENEMY_CONFIGS[enemy.type];
      grid[pos.y]![pos.x] = colorize(config.symbol, config.color);
    }
  }

  // Effects
  for (const effect of effects) {
    if (effect.pos.y >= 0 && effect.pos.y < map.height && effect.pos.x >= 0 && effect.pos.x < map.width) {
      if (effect.type === 'attack') grid[effect.pos.y]![effect.pos.x] = colorize('*', 'yellow');
      if (effect.type === 'kill') grid[effect.pos.y]![effect.pos.x] = colorize('+', 'green');
    }
  }

  // Cursor
  const { pos: cp } = cursor;
  if (cp.y >= 0 && cp.y < map.height && cp.x >= 0 && cp.x < map.width) {
    const existing = grid[cp.y]![cp.x]!;
    grid[cp.y]![cp.x] = `{inverse}${existing}{/inverse}`;
  }

  return grid.map(row => row!.join('')).join('\n');
}
