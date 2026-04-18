export type MachineState = 'idle' | 'warning' | 'critical' | 'broken';

export class Machine {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number; // 0-100
  state: MachineState;
  degradationRate: number;
  lastFixTime: number;
  type: number; // 0-2 for different machine types

  constructor(id: number, x: number, y: number, degradationRate: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 140;
    this.health = 100;
    this.state = 'idle';
    this.degradationRate = degradationRate;
    this.lastFixTime = Date.now();
    this.type = Math.floor(Math.random() * 3);
  }

  update(deltaTime: number): void {
    // Degrade health over time
    this.health -= this.degradationRate * deltaTime;
    this.health = Math.max(0, this.health);

    // Update state based on health
    if (this.health <= 0) {
      this.state = 'broken';
    } else if (this.health <= 30) {
      this.state = 'critical';
    } else if (this.health <= 60) {
      this.state = 'warning';
    } else {
      this.state = 'idle';
    }
  }

  fix(): number {
    if (this.state === 'broken') {
      return 0; // Can't fix broken machines
    }

    const pointsEarned = this.state === 'critical' ? 20 : this.state === 'warning' ? 10 : 5;
    this.health = 100;
    this.state = 'idle';
    this.lastFixTime = Date.now();
    return pointsEarned;
  }

  isPointInside(px: number, py: number): boolean {
    return px >= this.x && px <= this.x + this.width &&
           py >= this.y && py <= this.y + this.height;
  }

  isBroken(): boolean {
    return this.state === 'broken';
  }
}
