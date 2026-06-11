# Business Logic Model

## Game Loop Algorithm

```
function gameTick(state: GameState): GameState {
  if (state.phase !== 'playing') return state;

  let s = state;
  s = incrementTick(s);
  s = spawnEnemies(s);
  s = moveEnemies(s);
  s = processTowerCooldowns(s);
  s = processTowerAttacks(s);
  s = processDeadEnemies(s);
  s = processEscapedEnemies(s);
  s = checkWaveComplete(s);
  s = checkWinLose(s);
  s = decayEffects(s);
  return s;
}
```

## Step Details

### 1. incrementTick
- `tick += 1`

### 2. spawnEnemies
- If `wave.spawnQueue` is not empty and `wave.spawnTimer <= 0`:
  - Pop next entry from spawnQueue
  - Create new Enemy at path[0] with HP scaled by wave number
  - Reset spawnTimer to entry's interval
- Else: `spawnTimer -= 1`

### 3. moveEnemies
- For each enemy:
  - Calculate effectiveSpeed (apply slow if active)
  - `pathProgress += effectiveSpeed`
  - Compute visual position by interpolating path[floor(progress)] → path[ceil(progress)]

### 4. processTowerCooldowns
- For each tower: if `cooldown > 0`, `cooldown -= 1`

### 5. processTowerAttacks
- For each tower with `cooldown === 0`:
  - Find all enemies within range
  - Select target: enemy with highest pathProgress (closest to exit)
  - If target found:
    - Apply damage (splash if applicable)
    - Apply slow (if slow tower)
    - Reset cooldown to fireRate
    - Create attack Effect

### 6. processDeadEnemies
- Filter enemies with `hp <= 0`
- For each dead enemy: `currency += reward`, `score += reward`
- Create kill Effects at dead enemy positions
- Remove dead enemies from list

### 7. processEscapedEnemies
- Filter enemies with `pathProgress >= pathLength - 1`
- For each escaped: `lives -= 1`
- Remove escaped enemies from list

### 8. checkWaveComplete
- If spawnQueue is empty AND no enemies alive:
  - If currentWave < 20: advance to next wave (increment, build new spawnQueue, set delay)
  - If currentWave === 20: mark for win check

### 9. checkWinLose
- If `lives <= 0`: phase = 'lost'
- If wave 20 cleared AND no enemies: phase = 'won'

### 10. decayEffects
- For each effect: `ttl -= 1`
- Remove effects with `ttl <= 0`

## Input Processing (separate from tick, immediate)

```
function applyCommand(state: GameState, cmd: GameCommand): GameState {
  switch (cmd.type):
    'move'        → update cursor position (clamped to grid)
    'selectTower' → set cursor.selectedTower
    'place'       → validate & place tower, deduct currency
    'upgrade'     → validate & upgrade tower at cursor, deduct currency
    'pause'       → toggle phase between 'playing' and 'paused'
    'quit'        → trigger graceful exit
    'help'        → toggle help overlay
}
```

## Tower Configuration Data

| Type | Symbol | Cost | Damage | Range | FireRate | Splash | Slow | Color |
|---|---|---|---|---|---|---|---|---|
| Basic | `T` | 15 | 10 | 3 | 8 | 0 | 1.0 | white |
| Sniper | `S` | 30 | 40 | 6 | 20 | 0 | 1.0 | blue |
| Splash | `X` | 25 | 8 | 2 | 12 | 1.5 | 1.0 | red |
| Slow | `~` | 20 | 0 | 3 | 10 | 0 | 0.5 | cyan |
| Rapid | `R` | 20 | 5 | 2 | 3 | 0 | 1.0 | yellow |

Upgrade cost: [20, 40] for all types. Upgrade multiplier: 1.5 (50% stat increase per level).

## Enemy Configuration Data

| Type | Symbol | BaseHP | Speed | Reward | Color |
|---|---|---|---|---|---|
| Normal | `o` | 30 | 0.08 | 10 | green |
| Fast | `f` | 15 | 0.16 | 8 | yellow |
| Tank | `O` | 80 | 0.04 | 25 | red |
| Swarm | `.` | 10 | 0.10 | 5 | magenta |

Speed = path steps per tick. At 10 FPS, Normal crosses ~0.8 tiles/second.
