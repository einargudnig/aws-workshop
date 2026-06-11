# Unit Test Execution

## Run Unit Tests

### 1. Execute All Unit Tests
```bash
npm test
```

### 2. Run Tests in Watch Mode (Development)
```bash
npm run test:watch
```

### 3. Expected Results
- **Total Tests**: 21
- **Test Files**: 5 (economy, enemies, towers, waves, game-loop)
- **Expected**: All 21 pass, 0 failures

### 4. Test Coverage by Module

| Module | Tests | Coverage |
|--------|-------|----------|
| Economy | 5 | canAfford, spend, reward, loseLife |
| Enemies | 3 | createEnemy HP scaling, movement, escape |
| Towers | 4 | placement (valid/invalid/insufficient funds), upgrade |
| Waves | 5 | queue generation, scaling, cleared check, nextWave |
| Game Loop | 4 | tick increment, pause/won state, enemy spawning |

### 5. Fix Failing Tests
If tests fail:
1. Check the test output for specific assertion failures
2. Compare expected vs actual values
3. Verify game logic in the corresponding `src/` module
4. Rerun with `npm test` to confirm fix
