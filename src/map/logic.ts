import type { GameMap, Position, Tower } from '../core/types.js';

export function isBuildable(map: GameMap, towers: Tower[], pos: Position): boolean {
  if (pos.x < 0 || pos.x >= map.width || pos.y < 0 || pos.y >= map.height) return false;
  if (map.tiles[pos.y]![pos.x] !== 'buildable') return false;
  return !towers.some(t => t.pos.x === pos.x && t.pos.y === pos.y);
}

export function getPath(map: GameMap): Position[] {
  return map.path;
}

export function positionAtProgress(path: Position[], progress: number): Position {
  const idx = Math.min(Math.floor(progress), path.length - 1);
  return path[idx]!;
}
