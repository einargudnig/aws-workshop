# Integration Test Instructions

## Purpose
Test interactions between game modules to ensure the full game loop works end-to-end.

## Test Scenarios

### Scenario 1: Tower attacks kill enemy and reward player
- **Modules**: towers, enemies, economy
- **Setup**: Create state with a tower in range of an enemy with low HP
- **Test**: Run processTowerAttacks → processDeadEnemies
- **Expected**: Enemy removed, currency increased by reward amount

### Scenario 2: Full wave lifecycle
- **Modules**: waves, enemies, game-loop
- **Setup**: Create state at wave 1 start
- **Test**: Run gameTick repeatedly until wave clears
- **Expected**: All enemies spawned, killed/escaped, wave advances to 2

### Scenario 3: Game over when lives reach 0
- **Modules**: enemies, economy, game-loop
- **Setup**: Create state with 1 life and enemy about to escape
- **Test**: Run gameTick until enemy escapes
- **Expected**: phase changes to 'lost'

## Manual Integration Testing

Since this is a terminal game, full integration is best validated by playing:

```bash
npm run dev
```

**Test checklist:**
- [ ] Game launches and displays map
- [ ] Cursor moves with h/j/k/l
- [ ] Tower placement works (select with 1-5, place with Enter)
- [ ] Enemies spawn and move along path
- [ ] Towers fire at enemies automatically
- [ ] Currency updates on kills
- [ ] Lives decrease when enemies escape
- [ ] Pause/resume works with 'p'
- [ ] Help overlay toggles with '?'
- [ ] Game over screen shows on loss
- [ ] Quit works with 'q'
