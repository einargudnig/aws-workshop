# Performance Test Instructions

## Purpose
Ensure the game loop runs smoothly at target tick rate without perceptible lag.

## Performance Requirements
- **Tick Rate**: ≤100ms per tick (10 FPS minimum)
- **Input Latency**: <50ms from keypress to screen update
- **CPU Usage**: <30% sustained during gameplay
- **Memory**: <100MB RSS

## Manual Performance Validation

### 1. Run the game and observe
```bash
npm run dev
```

- Game should feel smooth during active waves (10+ enemies on screen)
- No visible stuttering or frame drops
- Cursor movement should feel instant
- Tower placement should respond immediately

### 2. Monitor resource usage
```bash
# In a separate terminal:
top -pid $(pgrep -f "tsx src/index")
```

Verify CPU stays under 30% and memory under 100MB.

## Stress Test: Many Enemies

To test performance under load, temporarily modify `src/waves/logic.ts` `buildSpawnQueue` to spawn 50+ enemies at once and verify the game still runs smoothly.

## N/A for This Project
- No network requests to benchmark
- No database queries to optimize
- No concurrent users to simulate
