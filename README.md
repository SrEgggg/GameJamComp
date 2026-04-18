# GameJamComp

# Night Shift: Maintenance Madness


summary of the current file organization of src folder

Design machine like robots and sound file needed

<img width="2000" height="2000" alt="src (1)" src="https://github.com/user-attachments/assets/bbb70693-8b37-4aff-8210-a66a485655f4" />


A game where you play as a sleep-deprived night shift maintenance worker trying to keep machines running at a failing factory.

## Project Structure

```
src/
├── main.tsx              # Application entry point
├── styles/               # CSS stylesheets
├── app/
│   ├── App.tsx           # Root component with routing logic
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for global state
│   ├── game/             # Core game engine (ECS-like architecture)
│   └── screens/          # Full-screen game views
```

---

## Core Architecture

### Entry Point

| File | Purpose |
|------|---------|
| `src/main.tsx` | React application bootstrap. Renders the root `<App />` component into the `#root` DOM element. |

### App Root

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Wraps the app in `<GameProvider>` context. Renders the current screen (`MainMenu`, `Gameplay`, or `GameOver`) based on game state. |

---

## Game Engine (`src/app/game/`)

The game uses an ECS-like (Entity-Component-System) architecture for the core gameplay.

### Entities

| Class | File | Purpose |
|-------|------|---------|
| `Machine` | `entities/Machine.ts` | Represents a single machine on the factory floor. |

#### Machine Class

**Properties:**
- `id: number` - Unique identifier
- `x, y: number` - Position on canvas
- `width, height: number` - Dimensions (120x140px)
- `health: number` - Current health (0-100)
- `state: MachineState` - Current state: `'idle' | 'warning' | 'critical' | 'broken'`
- `degradationRate: number` - How fast health decays per frame
- `type: number` - Visual variant (0-2)

**Methods:**
- `update(deltaTime)` - Degrades health over time, updates state based on thresholds
- `fix()` - Restores health to 100, returns points earned (5/10/20 based on urgency)
- `isPointInside(px, py)` - Hit detection for click interactions
- `isBroken()` - Returns true if machine has failed

### Systems

| Class | File | Purpose |
|-------|------|---------|
| `RenderSystem` | `systems/RenderSystem.ts` | Handles all canvas drawing operations |
| `GameScene` | `scenes/GameScene.ts` | Main game loop controller |

#### RenderSystem Class

**Methods:**
- `clear()` - Clears canvas with dark background
- `renderMachine(machine)` - Draws a machine with visual state (colors, shake effects, health bar)
- `renderBackground(day, sleepDeprivation)` - Draws grid pattern, darkens with fatigue
- `applyScreenEffects(sleepDeprivation)` - Applies vignette blur at high fatigue

#### GameScene Class

**Purpose:** Manages the game loop, machine spawning, and game state callbacks.

**Key Properties:**
- `machines: Machine[]` - Array of active machines
- `day: number` - Current day number
- `sleepDeprivation: number` - Fatigue level (0-100)
- `dayDuration: number` - Time per day (30 seconds)

**Key Methods:**
- `start(day, sleepDeprivation)` - Initializes and starts the game loop
- `stop()` - Cancels the animation frame
- `handleClick(x, y)` - Processes canvas clicks, fixes machines
- `getTimeRemaining()` - Returns milliseconds left in current day
- `getBrokenCount()` - Returns count of failed machines

**Callbacks (passed via constructor):**
- `onScoreUpdate(points)` - Called when player earns points
- `onGameOver(score, failed)` - Called when 3+ machines break
- `onNextDay()` - Called when day timer expires

---

## State Management (`src/app/context/`)

### GameContext

| Export | Type | Purpose |
|--------|------|---------|
| `GameProvider` | React Component | Context provider wrapping the entire app |
| `useGame` | Hook | Access global game state and actions |
| `GameState` | Interface | Shape of global state |

#### GameState Interface

```typescript
{
  currentScreen: 'menu' | 'gameplay' | 'gameover',
  day: number,           // Current day (starts at 1)
  score: number,         // Player's score
  highScore: number,     // Persisted in localStorage
  machinesFailed: number, // Count of broken machines
  isGameRunning: boolean,
  sleepDeprivation: number, // 0-100 fatigue meter
  coins: number,         // Currency for upgrades
  efficiencyLevel: number,  // 0-3 (reduces fatigue gain)
  coinBoosterLevel: number  // 0+ (multiplies coin earnings)
}
```

#### GameContext Actions

| Action | Purpose |
|--------|---------|
| `startGame()` | Begin a new game, reset all counters |
| `endGame(score, failed)` | End game, save high score if beaten |
| `nextDay()` | Increment day, increase fatigue by 15 |
| `updateScore(points)` | Add points to current score |
| `returnToMenu()` | Navigate back to main menu |
| `increaseSleepDeprivation(amount)` | Add fatigue (capped at 100) |
| `reduceSleepDeprivation()` | Decrease fatigue by 1 (used during sleep) |
| `addCoin()` | Add coins (multiplied by booster level) |
| `spendCoins(amount)` | Deduct coins, returns success boolean |
| `upgradeEfficiency()` | Purchase efficiency upgrade (costs 20/60/180) |
| `upgradeCoinBooster()` | Purchase coin booster (cost = 10 * 2^level) |

---

## Screens (`src/app/screens/`)

### MainMenu

| File | Purpose |
|------|---------|
| `MainMenu.tsx` | Landing screen with story intro and start button |

**Features:**
- Displays high score from localStorage
- Atmospheric factory theme with ambient lights
- CRT terminal-style story text
- "Start Shift" button to begin game

### Gameplay

| File | Purpose |
|------|---------|
| `Gameplay.tsx` | Main game view with canvas and UI overlays |

**Features:**
- Canvas rendering for machine game
- HUD overlay (day, score, fatigue, timer)
- Sleep button (reduces fatigue over time)
- Math quiz panel (earn coins)
- Coin shop panel (purchase upgrades)
- Instructions dropdown (TypingGuide animation)
- Day transition overlay

**Key Logic:**
- Initializes `GameScene` on mount
- Handles canvas click → machine fix
- Applies fatigue-based blur effect at high deprivation
- Blackout overlay during sleep mode

### GameOver

| File | Purpose |
|------|---------|
| `GameOver.tsx` | End-game summary screen |

**Features:**
- Final score display
- Days survived count
- Machines failed count
- High score celebration (if beaten)
- "Try Again" and "Main Menu" buttons

---

## UI Components (`src/app/components/`)

### HUD

| File | Purpose |
|------|---------|
| `HUD.tsx` | Heads-up display showing game stats |

**Props:** `day`, `score`, `sleepDeprivation`, `timeRemaining`, `brokenMachines`, `coins`

**Visual Elements:**
- Day counter
- Score display
- Coin count
- Failed machines (X/3)
- Fatigue progress bar
- Time remaining bar (color-coded: green → amber → red)

### CoinShop

| File | Purpose |
|------|---------|
| `CoinShop.tsx` | Upgrade shop UI |

**Upgrades:**
1. **Machine Efficiency** (max level 3)
   - Reduces fatigue gain per click by 30% per level
   - Costs: 20 → 60 → 180 coins

2. **Coin Booster** (unlimited levels)
   - Multiplies coin earnings: 2^level
   - Cost scales: 10 * 2^currentLevel

### MathQuiz

| File | Purpose |
|------|---------|
| `MathQuiz.tsx` | Mini-game to earn coins |

**Props:** `day` (scales difficulty), `onCorrect` (callback)

**Features:**
- Generates arithmetic problems (+, -, *)
- Difficulty scales with day (larger numbers, more operators)
- Visual feedback for correct/wrong answers
- Auto-generates new question on success

### TypingGuide

| File | Purpose |
|------|---------|
| `TypingGuide.tsx` | Typewriter text animation |

**Props:** `text`, `speed` (ms/char), `onComplete`

**Features:**
- Character-by-character reveal
- Blinking cursor at end
- Optional completion callback

---

## UI Components Library (`src/app/components/ui/`)

Shadcn/ui component library. Key exports:
- `Button` - Styled button variants
- `Card`, `Badge`, `Progress` - Layout components
- Form elements: `Input`, `Label`, `Checkbox`, `Select`, etc.
- Dialogs: `AlertDialog`, `Dialog`, `Sheet`
- Navigation: `Breadcrumb`, `Pagination`, `Sidebar`

---

## Game Flow

```
MainMenu → startGame() → Gameplay
                      ↓
              [GameScene runs game loop]
                      ↓
              Day timer expires → nextDay()
                      ↓
              [Repeat with increased difficulty]
                      ↓
              3 machines break → endGame()
                      ↓
GameOver → returnToMenu() → MainMenu
```

---

## Key Game Mechanics

### Machine States

| Health | State | Points on Fix |
|--------|-------|---------------|
| 61-100 | idle | 5 |
| 31-60 | warning | 10 |
| 1-30 | critical | 20 |
| 0 | broken | 0 (cannot fix) |

### Sleep Deprivation Effects

- Increases by ~2 per machine click (reduced by Efficiency upgrade)
- Increases by 15 at end of each day
- At 50+: Screen blur effect
- At 70+: Screen shake visual
- Machines degrade faster with higher fatigue

### Coin System

- Earn coins by solving math quizzes
- `addCoin()` applies multiplier: `coins += 2^coinBoosterLevel`
- Spend on Efficiency (3 levels) or Coin Booster (infinite)

---

## Development Notes

### Running the Game

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Technologies

- React 18 + TypeScript
- Canvas API for game rendering
- Tailwind CSS for UI styling
- Shadcn/ui component library
- Vite build tool
