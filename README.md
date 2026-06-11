# ASCII Tower Defense

A terminal-based tower defense game with colored ASCII graphics and vim-style controls.

## Quick Start

```bash
npm install
npm run dev
```

## Build & Run

```bash
npm run build
npm start
```

## Controls (Vim Motions)

| Key | Action |
|-----|--------|
| `h` | Move cursor left |
| `j` | Move cursor down |
| `k` | Move cursor up |
| `l` | Move cursor right |
| `1-5` | Select tower type |
| `Enter`/`Space` | Place tower |
| `u` | Upgrade tower |
| `p` | Pause/Resume |
| `q` | Quit |
| `?` | Toggle help |

## Tower Types

| # | Tower | Cost | Damage | Range | Special |
|---|-------|------|--------|-------|---------|
| 1 | Basic (T) | $15 | 10 | 3 | — |
| 2 | Sniper (S) | $30 | 40 | 6 | Long range |
| 3 | Splash (X) | $25 | 8 | 2 | Area damage |
| 4 | Slow (~) | $20 | 0 | 3 | Slows enemies |
| 5 | Rapid (R) | $20 | 5 | 2 | Fast fire rate |

Towers can be upgraded twice (levels 1→2→3). Each upgrade costs $20/$40 and increases stats by 50%.

## Gameplay

- Enemies follow a fixed path from entrance to exit
- Place towers on buildable tiles to stop them
- Earn currency by killing enemies
- Survive 20 waves to win
- You start with 20 lives and $100

## Enemy Types

| Enemy | HP | Speed | Reward | Appears |
|-------|----|-------|--------|---------|
| Normal (o) | 30 | Medium | $10 | Wave 1+ |
| Fast (f) | 15 | Fast | $8 | Wave 6+ |
| Tank (O) | 80 | Slow | $25 | Wave 11+ |
| Swarm (.) | 10 | Medium | $5 | Wave 16+ |

## Development

```bash
npm test           # Run tests
npm run lint       # Lint with oxlint
npm run typecheck  # Type check with tsc
```

## Tech Stack

- TypeScript (strict mode)
- blessed (terminal UI framework)
- vitest (testing)
- oxlint (linting)
