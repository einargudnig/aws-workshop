# User Stories

## Epic 1: Core Gameplay

### Story 1.1: Start and Play a Game (P1)
**As a** casual terminal player,  
**I want to** launch the game and immediately start playing,  
**So that** I can enjoy a quick session without setup friction.

**Acceptance Criteria:**
- Game starts with a single command (`npx` or binary)
- Map, enemies, and status are visible within 2 seconds of launch
- First wave begins automatically or with a single keypress

### Story 1.2: Win or Lose a Game (P1)
**As a** player,  
**I want to** clearly know when I've won or lost and see my final score,  
**So that** I feel a sense of completion and know how I performed.

**Acceptance Criteria:**
- Game over screen shows when lives reach 0 (loss) or all waves cleared (win)
- Final score and wave reached are displayed
- Player can quit or restart from the end screen

### Story 1.3: Pause and Resume (P2)
**As a** player,  
**I want to** pause the game mid-session,  
**So that** I can handle interruptions without losing progress.

**Acceptance Criteria:**
- Pressing `p` pauses all game activity (enemies stop, towers stop firing)
- Pressing `p` again resumes
- Pause state is clearly indicated on screen

---

## Epic 2: Tower System

### Story 2.1: Place Towers (P1)
**As a** player,  
**I want to** select a tower type and place it on the map using vim keys,  
**So that** I can defend the path against enemies.

**Acceptance Criteria:**
- `h/j/k/l` moves cursor, number keys select tower type, Enter/Space places
- Towers can only be placed on valid (non-path, unoccupied) tiles
- Placement deducts cost from currency; insufficient funds shows feedback

### Story 2.2: Upgrade Towers (P2)
**As a** player,  
**I want to** upgrade placed towers to improve their effectiveness,  
**So that** I can adapt my defense to harder waves.

**Acceptance Criteria:**
- Pressing `u` on a placed tower upgrades it (up to 2 levels)
- Upgrade cost is deducted; visual indicator shows upgrade level
- Upgraded stats (damage/range/speed) take effect immediately

### Story 2.3: Tower Variety and Strategy (P1)
**As a** player,  
**I want to** choose from multiple tower types with different behaviors,  
**So that** I can develop strategies combining towers effectively.

**Acceptance Criteria:**
- At least 5 tower types available (Basic, Sniper, Splash, Slow, Rapid)
- Each tower has distinct visual symbol and color
- Tower stats (range, damage, fire rate) create meaningful trade-offs

---

## Epic 3: Enemy System

### Story 3.1: Waves of Enemies (P1)
**As a** player,  
**I want to** face waves of enemies that increase in difficulty,  
**So that** the game feels progressively challenging and engaging.

**Acceptance Criteria:**
- Enemies spawn in numbered waves with increasing difficulty
- Wave composition varies (mix of enemy types)
- Brief pause or indicator between waves so player can prepare

### Story 3.2: Enemy Variety (P2)
**As a** player,  
**I want to** face different enemy types with distinct behaviors,  
**So that** I need to adapt my tower strategy to counter different threats.

**Acceptance Criteria:**
- At least 4 enemy types (Normal, Fast, Tank, Swarm) with distinct visuals
- Each type has different HP, speed, and reward values
- Enemy type is visually distinguishable by color/symbol

---

## Epic 4: UI & Controls

### Story 4.1: Clear Game Display (P1)
**As a** player,  
**I want to** see the map, my resources, and available actions clearly,  
**So that** I can make informed decisions without confusion.

**Acceptance Criteria:**
- Status bar shows wave number, currency, lives, and score
- Tower selection panel shows available towers with costs
- Map clearly distinguishes path, buildable area, towers, and enemies

### Story 4.2: Responsive Vim Controls (P1)
**As a** player,  
**I want to** navigate and interact using vim-style keybindings with no lag,  
**So that** the game feels natural in my terminal workflow.

**Acceptance Criteria:**
- All controls respond within one frame (no perceptible input lag)
- `?` shows a controls help overlay
- Invalid actions show brief feedback (e.g., "Can't place here")

### Story 4.3: Visual Feedback for Actions (P2)
**As a** player,  
**I want to** see visual feedback when towers fire and enemies take damage,  
**So that** the game feels alive and I understand what's happening.

**Acceptance Criteria:**
- Towers show brief attack indicator when firing
- Enemies flash or change when taking damage
- Currency gain is briefly indicated when enemies are killed

---

## Story-Requirements Mapping

| Story | Requirements |
|---|---|
| 1.1 | FR-06, FR-10, NFR-01 |
| 1.2 | FR-09, FR-10 |
| 1.3 | FR-06 |
| 2.1 | FR-01, FR-02, FR-05, FR-07 |
| 2.2 | FR-03, FR-05 |
| 2.3 | FR-02 |
| 3.1 | FR-04, FR-06 |
| 3.2 | FR-04 |
| 4.1 | FR-08 |
| 4.2 | FR-07, NFR-02 |
| 4.3 | FR-08 |
