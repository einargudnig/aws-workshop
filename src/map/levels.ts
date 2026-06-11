import type { GameMap, Position, TileType } from '../core/types.js';

/**
 * Generate a snake-path map programmatically to avoid character-counting issues.
 * The path goes: left→right, down, right→left, down, repeat.
 */
export function createLevel1(): GameMap {
  const width = 30;
  const height = 15;

  // Initialize all tiles as buildable
  const tiles: TileType[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 'buildable' as TileType)
  );

  // Define path as a snake pattern
  const path: Position[] = [];

  // Row 1: left to right (x: 0 → 27)
  for (let x = 0; x <= 27; x++) path.push({ x, y: 1 });
  // Down from row 1 to row 3
  for (let y = 2; y <= 3; y++) path.push({ x: 27, y });
  // Row 3: right to left (x: 27 → 2)
  for (let x = 26; x >= 2; x--) path.push({ x, y: 3 });
  // Down from row 3 to row 5
  for (let y = 4; y <= 5; y++) path.push({ x: 2, y });
  // Row 5: left to right (x: 2 → 27)
  for (let x = 3; x <= 27; x++) path.push({ x, y: 5 });
  // Down from row 5 to row 7
  for (let y = 6; y <= 7; y++) path.push({ x: 27, y });
  // Row 7: right to left (x: 27 → 2)
  for (let x = 26; x >= 2; x--) path.push({ x, y: 7 });
  // Down from row 7 to row 9
  for (let y = 8; y <= 9; y++) path.push({ x: 2, y });
  // Row 9: left to right (x: 2 → 27)
  for (let x = 3; x <= 27; x++) path.push({ x, y: 9 });
  // Down from row 9 to row 11
  for (let y = 10; y <= 11; y++) path.push({ x: 27, y });
  // Row 11: right to left (x: 27 → 2)
  for (let x = 26; x >= 2; x--) path.push({ x, y: 11 });
  // Down from row 11 to row 13
  for (let y = 12; y <= 13; y++) path.push({ x: 2, y });
  // Row 13: left to right to exit (x: 2 → 29)
  for (let x = 3; x <= 29; x++) path.push({ x, y: 13 });

  // Mark path tiles
  for (const pos of path) {
    tiles[pos.y]![pos.x] = 'path';
  }

  // Mark borders as blocked
  for (let x = 0; x < width; x++) {
    tiles[0]![x] = 'blocked';
    tiles[height - 1]![x] = 'blocked';
  }
  for (let y = 0; y < height; y++) {
    tiles[y]![0] = tiles[y]![0] === 'path' ? 'path' : 'blocked';
    tiles[y]![width - 1] = tiles[y]![width - 1] === 'path' ? 'path' : 'blocked';
  }

  return { width, height, tiles, path };
}
