<<<<<<< HEAD
import { Machine } from '../entities/Machine';
import { RenderSystem } from '../systems/RenderSystem';

export class GameScene {
  private machines: Machine[] = [];
  private renderSystem: RenderSystem;
  private lastUpdateTime: number = 0;
  private animationFrameId: number | null = null;
  private day: number = 1;
  private sleepDeprivation: number = 0;
  private onScoreUpdate: (points: number) => void;
  private onGameOver: (score: number, failed: number) => void;
  private onNextDay: () => void;
  private score: number = 0;
  private dayStartTime: number = 0;
  private dayDuration: number = 30000; // 30 seconds per day
  private isRunning: boolean = false; // FIX #5: prevent double game loops

  constructor(
    canvas: HTMLCanvasElement,
    callbacks: {
      onScoreUpdate: (points: number) => void;
      onGameOver: (score: number, failed: number) => void;
      onNextDay: () => void;
    }
  ) {
    this.renderSystem = new RenderSystem(canvas);
    this.onScoreUpdate = callbacks.onScoreUpdate;
    this.onGameOver = callbacks.onGameOver;
    this.onNextDay = callbacks.onNextDay;
  }

  start(day: number, sleepDeprivation: number): void {
    // FIX #4: enforce cap on sleep deprivation internally
    this.sleepDeprivation = Math.min(100, sleepDeprivation);
    this.day = day;
    this.dayStartTime = Date.now();
    this.setupMachines();
    this.lastUpdateTime = performance.now();
    
    // FIX #5: stop any existing loop before starting a new one
    if (this.isRunning) {
      this.stop();
    }
    this.isRunning = true;
    this.gameLoop();
  }

  private setupMachines(): void {
    this.machines = [];
    const machineCount = Math.min(3 + this.day, 12); // Max 12 machines
    const baseDegradation = 0.01 + (this.day * 0.002) + (this.sleepDeprivation * 0.0002);

    const cols = Math.ceil(Math.sqrt(machineCount));
    const rows = Math.ceil(machineCount / cols);
    const spacingX = 160;
    const spacingY = 180;
    const offsetX = 50;
    const offsetY = 50;

    for (let i = 0; i < machineCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = offsetX + col * spacingX;
      const y = offsetY + row * spacingY;
      const degradationRate = baseDegradation * (0.8 + Math.random() * 0.4);
      
      this.machines.push(new Machine(i, x, y, degradationRate));
    }
  }

  private gameLoop = (): void => {
    // FIX #5: exit if scene is no longer running
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 16.67; // Normalize to 60fps
    this.lastUpdateTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number): void {
    // Update all machines
    this.machines.forEach(machine => machine.update(deltaTime));

    // Check for broken machines
    const brokenCount = this.machines.filter(m => m.isBroken()).length;
    
    // Game over if too many machines failed
    if (brokenCount >= 3) {
      this.stop();
      this.onGameOver(this.score, brokenCount);
      return;
    }

    // Check if day is complete
    const elapsed = Date.now() - this.dayStartTime;
    if (elapsed >= this.dayDuration) {
      // FIX #1 & #2: remove internal day progression and bonus scoring
      // Just stop the scene and notify parent. Parent will decide when to restart
      // with updated day and sleep deprivation, and can award bonus points itself.
      this.stop();
      this.onNextDay();
    }
  }

  private render(): void {
    this.renderSystem.renderBackground(this.day, this.sleepDeprivation);
    
    this.machines.forEach(machine => {
      this.renderSystem.renderMachine(machine);
    });

    this.renderSystem.applyScreenEffects(this.sleepDeprivation);
  }

  handleClick(x: number, y: number): void {
    for (const machine of this.machines) {
      if (machine.isPointInside(x, y)) {
        const points = machine.fix();
        if (points > 0) {
          this.score += points;
          this.onScoreUpdate(points);
        }
        break;
      }
    }
  }

  getTimeRemaining(): number {
    const elapsed = Date.now() - this.dayStartTime;
    return Math.max(0, this.dayDuration - elapsed);
  }

  getBrokenCount(): number {
    return this.machines.filter(m => m.isBroken()).length;
  }

  // FIX #3: expose total fixed count if needed, or remove unused variable.
  // We remove `machinesFixed` entirely since it's never used.
  // If parent needs this, they can track via onScoreUpdate or add a getter.
  // For now, variable is deleted.

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRunning = false;
  }
=======
import { Machine } from '../entities/Machine';
import { RenderSystem } from '../systems/RenderSystem';

export class GameScene {
  private machines: Machine[] = [];
  private renderSystem: RenderSystem;
  private lastUpdateTime: number = 0;
  private animationFrameId: number | null = null;
  private day: number = 1;
  private sleepDeprivation: number = 0;
  private onScoreUpdate: (points: number) => void;
  private onGameOver: (score: number, failed: number) => void;
  private onNextDay: () => void;
  private score: number = 0;
  private dayStartTime: number = 0;
  private dayDuration: number = 30000; // 30 seconds per day
  private isRunning: boolean = false; // FIX #5: prevent double game loops

  constructor(
    canvas: HTMLCanvasElement,
    callbacks: {
      onScoreUpdate: (points: number) => void;
      onGameOver: (score: number, failed: number) => void;
      onNextDay: () => void;
    }
  ) {
    this.renderSystem = new RenderSystem(canvas);
    this.onScoreUpdate = callbacks.onScoreUpdate;
    this.onGameOver = callbacks.onGameOver;
    this.onNextDay = callbacks.onNextDay;
  }

  start(day: number, sleepDeprivation: number): void {
    // FIX #4: enforce cap on sleep deprivation internally
    this.sleepDeprivation = Math.min(100, sleepDeprivation);
    this.day = day;
    this.dayStartTime = Date.now();
    this.setupMachines();
    this.lastUpdateTime = performance.now();
    
    // FIX #5: stop any existing loop before starting a new one
    if (this.isRunning) {
      this.stop();
    }
    this.isRunning = true;
    this.gameLoop();
  }

  private setupMachines(): void {
    this.machines = [];
    const machineCount = Math.min(3 + this.day, 12); // Max 12 machines
    const baseDegradation = 0.01 + (this.day * 0.002) + (this.sleepDeprivation * 0.0002);

    const cols = Math.ceil(Math.sqrt(machineCount));
    const rows = Math.ceil(machineCount / cols);
    const spacingX = 160;
    const spacingY = 180;
    const offsetX = 50;
    const offsetY = 50;

    for (let i = 0; i < machineCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = offsetX + col * spacingX;
      const y = offsetY + row * spacingY;
      const degradationRate = baseDegradation * (0.8 + Math.random() * 0.4);
      
      this.machines.push(new Machine(i, x, y, degradationRate));
    }
  }

  private gameLoop = (): void => {
    // FIX #5: exit if scene is no longer running
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 16.67; // Normalize to 60fps
    this.lastUpdateTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number): void {
    // Update all machines
    this.machines.forEach(machine => machine.update(deltaTime));

    // Check for broken machines
    const brokenCount = this.machines.filter(m => m.isBroken()).length;
    
    // Game over if too many machines failed
    if (brokenCount >= 3) {
      this.stop();
      this.onGameOver(this.score, brokenCount);
      return;
    }

    // Check if day is complete
    const elapsed = Date.now() - this.dayStartTime;
    if (elapsed >= this.dayDuration) {
      // FIX #1 & #2: remove internal day progression and bonus scoring
      // Just stop the scene and notify parent. Parent will decide when to restart
      // with updated day and sleep deprivation, and can award bonus points itself.
      this.stop();
      this.onNextDay();
    }
  }

  private render(): void {
    this.renderSystem.renderBackground(this.day, this.sleepDeprivation);
    
    this.machines.forEach(machine => {
      this.renderSystem.renderMachine(machine);
    });

    this.renderSystem.applyScreenEffects(this.sleepDeprivation);
  }

  handleClick(x: number, y: number): void {
    for (const machine of this.machines) {
      if (machine.isPointInside(x, y)) {
        const points = machine.fix();
        if (points > 0) {
          this.score += points;
          this.onScoreUpdate(points);
        }
        break;
      }
    }
  }

  getTimeRemaining(): number {
    const elapsed = Date.now() - this.dayStartTime;
    return Math.max(0, this.dayDuration - elapsed);
  }

  getBrokenCount(): number {
    return this.machines.filter(m => m.isBroken()).length;
  }

  // FIX #3: expose total fixed count if needed, or remove unused variable.
  // We remove `machinesFixed` entirely since it's never used.
  // If parent needs this, they can track via onScoreUpdate or add a getter.
  // For now, variable is deleted.

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isRunning = false;
  }
>>>>>>> eb30028916e28f64c0980fac1a0791b6b792021d
}