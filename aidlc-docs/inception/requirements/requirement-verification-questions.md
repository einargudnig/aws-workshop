# Requirements Verification Questions

Please answer the following questions to help clarify the requirements for the ASCII Tower Defense game.

## Question 1
What programming language should we use for the terminal game?

A) Python (rich ecosystem for terminal UIs: curses, blessed, rich)

B) TypeScript/Node.js (using libraries like blessed or ink)

C) Rust (using crossterm/ratatui for terminal rendering)

D) Go (using tcell/bubbletea for terminal UIs)

E) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 2
What level of gameplay complexity are you looking for?

A) Simple — single map, basic tower types (2-3), straightforward enemy waves

B) Moderate — multiple maps, several tower types (4-6), enemy variety, upgrade system

C) Complex — map editor, many tower types with upgrade trees, boss enemies, scoring/leaderboard

D) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 3
How should the game map/grid be structured?

A) Fixed-path — enemies follow a predefined path, towers placed alongside

B) Open-field — enemies pathfind from entrance to exit, towers block and redirect

C) Hybrid — predefined paths but towers can be placed to influence routing

D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
What should the visual style be?

A) Pure ASCII characters only (letters, numbers, basic symbols like #, @, *, |, -)

B) Extended ASCII / Unicode box-drawing characters for cleaner grid lines

C) Colored ASCII using terminal ANSI colors for visual distinction

D) Rich terminal UI with borders, panels, and status bars (still text-based)

E) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 5
How should the game timing work?

A) Real-time — enemies move continuously, player places towers between waves or during action

B) Turn-based — player places/upgrades towers, then advances to next wave step

C) Hybrid — build phase (paused) between waves, real-time during waves

D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
What's the target platform and distribution model?

A) Single executable/script run locally (no installation beyond runtime)

B) Installable package via package manager (npm, pip, cargo, etc.)

C) Both — works as standalone and installable

D) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 7
Should the game have persistent state (save/load)?

A) No persistence — each game session is standalone

B) Basic persistence — save high scores locally

C) Full persistence — save/load game state mid-session + high scores

D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question: Security Extensions
Should security extension rules be enforced for this project?

A) Yes — enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)

B) No — skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)

X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?

A) Yes — enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, serialization, or stateful components)

B) Partial — enforce PBT rules only for pure functions and serialization round-trips (suitable for projects with limited algorithmic complexity)

C) No — skip all PBT rules (suitable for simple CRUD applications, UI-only projects, or thin integration layers with no significant business logic)

X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question: Resiliency Extensions
Should the resiliency baseline be applied to this project?

A) Yes — apply the resiliency baseline as directional best practices and design-time guidance (recommended for business-critical workloads)

B) No — skip the resiliency baseline (suitable for PoCs, prototypes, and experimental projects where rapid iteration matters more than reliability)

X) Other (please describe after [Answer]: tag below)

[Answer]: A
