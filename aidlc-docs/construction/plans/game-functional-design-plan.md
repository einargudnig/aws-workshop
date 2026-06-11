# Functional Design Plan — Tower Defense Game

## Plan Steps
- [x] Define domain entities and data structures
- [x] Define business rules (tower targeting, damage, economy)
- [x] Define business logic model (game loop algorithm, wave progression)

---

## Questions

### Game Balance

## Question 1
How should tower targeting priority work when multiple enemies are in range?

A) First — target the enemy closest to the exit (most urgent threat)

B) Strongest — target the enemy with highest HP

C) Nearest — target the enemy closest to the tower

D) Player-configurable per tower (adds complexity but more strategy)

E) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
How should wave difficulty scale?

A) Linear — each wave adds a fixed amount of enemy HP/count

B) Exponential — enemy stats multiply each wave (gets hard fast)

C) Curated — hand-design 15-20 waves with specific compositions for a balanced arc

D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
Roughly how many waves should a full game have?

A) 10 waves — short session (~5 minutes)

B) 20 waves — medium session (~10 minutes)

C) 30+ waves — longer session (~15+ minutes)

D) Endless — waves keep coming until you lose

E) Other (please describe after [Answer]: tag below)

[Answer]: B
