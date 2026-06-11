# Components

## Architecture: Functional / Data-Driven

All game state is represented as plain data objects. Pure functions transform state each tick. Side effects (rendering, input) are isolated at the boundaries.

---

## Component: GameState
**Purpose**: Central immutable game state record, updated each tick  
**Responsibilities**:
- Hold all game data (map, towers, enemies, economy, wave info)
- Serve as single source of truth passed through the game loop

---

## Component: Map
**Purpose**: Define the game grid, path, and buildable tiles  
**Responsibilities**:
- Store grid dimensions and tile types (path, buildable, blocked)
- Define the fixed enemy path as an ordered sequence of coordinates
- Provide spatial queries (is tile buildable? what's at position X,Y?)

---

## Component: Towers
**Purpose**: Tower data and tower-related logic  
**Responsibilities**:
- Define tower type configurations (cost, damage, range, fire rate, splash)
- Store placed tower instances with position, type, level, cooldown state
- Compute targeting (find enemies in range)
- Compute attacks (damage application, cooldown reset)

---

## Component: Enemies
**Purpose**: Enemy data and movement/spawning logic  
**Responsibilities**:
- Define enemy type configurations (HP, speed, reward)
- Store active enemy instances with position, HP, path progress
- Compute movement along the fixed path
- Detect enemies reaching the exit

---

## Component: Waves
**Purpose**: Wave progression and enemy spawning schedule  
**Responsibilities**:
- Define wave compositions (which enemy types, how many, spawn interval)
- Track current wave number and spawn progress
- Determine when a wave is complete and next wave starts

---

## Component: Economy
**Purpose**: Player resources and game state (lives, currency, score)  
**Responsibilities**:
- Track currency, lives, and score
- Validate purchases (can afford tower/upgrade?)
- Apply rewards (enemy killed) and costs (tower placed/upgraded)

---

## Component: Input
**Purpose**: Capture and translate keyboard input into game commands  
**Responsibilities**:
- Listen for keypress events from the TUI framework
- Map vim keys to cursor movement commands
- Map action keys to game commands (place, upgrade, pause, quit)
- Maintain cursor position state

---

## Component: Renderer
**Purpose**: Render game state to terminal using TUI framework  
**Responsibilities**:
- Draw the game grid (path, buildable tiles, towers, enemies)
- Draw status bar (wave, currency, lives, score)
- Draw tower selection panel
- Draw visual effects (attacks, damage flashes)
- Draw overlays (pause, game over, help)
- Handle terminal resize
