# Business Rules

## Tower Placement Rules
- Tower can only be placed on `buildable` tiles
- Tower cannot be placed on a tile already occupied by another tower
- Player must have sufficient currency (≥ tower cost)
- Currency is deducted immediately on placement

## Tower Upgrade Rules
- Tower can be upgraded from level 1→2 and 2→3 (max level 3)
- Upgrade cost defined per level in TowerConfig.upgradeCost
- Stats multiply by `upgradeMultiplier` per level: `stat = baseStat * (upgradeMultiplier ^ (level - 1))`
- Player must have sufficient currency
- Cannot upgrade tower at max level

## Tower Targeting Rules (Priority: First)
- Each tick, a tower with cooldown=0 scans for enemies within range
- **Target selection**: Enemy with highest `pathProgress` (closest to exit) within range
- Range check: Manhattan distance ≤ tower range (in tiles)
- After firing, cooldown resets to `fireRate` ticks
- Cooldown decrements by 1 each tick

## Tower Attack Rules
- **Single target** (splash=0): Apply `damage` to targeted enemy
- **Splash** (splash>0): Apply `damage` to all enemies within `splash` radius of target
- **Slow tower** (slowFactor<1): Apply slow debuff — set enemy `slowedUntil = currentTick + fireRate`
- Damage formula: `effectiveDamage = config.damage * (config.upgradeMultiplier ^ (tower.level - 1))`

## Enemy Movement Rules
- Each tick, enemy advances along path by `speed` (modified if slowed)
- If `currentTick < enemy.slowedUntil`: effective speed = `speed * slowFactor` of the slow tower that hit it
- `pathProgress += effectiveSpeed` each tick
- Enemy position interpolated from path array using `pathProgress` as index

## Enemy Death Rules
- Enemy dies when `hp ≤ 0`
- On death: player receives `reward` currency, score += reward
- Dead enemies are removed from active list

## Enemy Escape Rules
- Enemy escapes when `pathProgress ≥ path.length - 1`
- On escape: player loses 1 life
- Escaped enemies are removed from active list

## Wave Progression Rules
- Game has 20 waves total
- Wave starts automatically after previous wave is cleared (all enemies dead/escaped, spawn complete)
- Brief delay (30 ticks / 3 seconds) between waves
- First wave starts after initial delay (20 ticks / 2 seconds)

## Wave Scaling (Linear)
- Base enemy HP scales: `baseHp * (1 + 0.15 * (waveNumber - 1))`
- Enemy count per wave scales: `baseCount + floor(waveNumber * 0.5)`
- Enemy variety increases: waves 1-5 normal only, waves 6-10 add fast, waves 11-15 add tank, waves 16+ add swarm
- Spawn interval decreases slightly: `max(5, baseInterval - waveNumber)`

## Economy Rules
- Starting currency: 100
- Starting lives: 20
- Starting score: 0
- Enemy rewards: Normal=10, Fast=8, Tank=25, Swarm=5
- Score = total currency earned from kills

## Win/Lose Conditions
- **Lose**: lives ≤ 0 → phase = 'lost'
- **Win**: wave 20 cleared (all enemies dead, spawn complete, currentWave=20) → phase = 'won'
- Game stops processing ticks when phase is 'won' or 'lost'

## Pause Rules
- When paused: no enemy movement, no tower firing, no spawning, no cooldown decrement
- Player can still move cursor and view help while paused
- Player cannot place or upgrade towers while paused (debatable — keeping it simple)
