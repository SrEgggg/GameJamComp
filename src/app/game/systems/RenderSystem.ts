import { Machine } from '../entities/Machine';

export class RenderSystem {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    this.ctx = context;
  }

  clear(): void {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderMachine(machine: Machine): void {
    const { ctx } = this;

    // Machine body
    ctx.save();

    // Add shake effect for critical machines
    if (machine.state === 'critical' || machine.state === 'broken') {
      const shakeX = (Math.random() - 0.5) * 4;
      const shakeY = (Math.random() - 0.5) * 4;
      ctx.translate(shakeX, shakeY);
    }

    // Machine color based on state
    let bodyColor = '#4a5568';
    switch (machine.state) {
      case 'warning':
        bodyColor = '#d69e2e';
        break;
      case 'critical':
        bodyColor = '#e53e3e';
        break;
      case 'broken':
        bodyColor = '#2d3748';
        break;
    }

    // Draw machine body
    ctx.fillStyle = bodyColor;
    ctx.fillRect(machine.x, machine.y, machine.width, machine.height);

    // Draw machine details
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 3;
    ctx.strokeRect(machine.x, machine.y, machine.width, machine.height);

    // Draw control panel
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(machine.x + 10, machine.y + 10, machine.width - 20, 30);

    // Draw indicator lights
    for (let i = 0; i < 3; i++) {
      const lightX = machine.x + 20 + i * 30;
      const lightY = machine.y + 20;
      
      ctx.beginPath();
      ctx.arc(lightX, lightY, 6, 0, Math.PI * 2);
      
      if (machine.state === 'broken') {
        ctx.fillStyle = '#4a5568';
      } else if (machine.state === 'critical') {
        ctx.fillStyle = Math.random() > 0.5 ? '#fc8181' : '#e53e3e';
      } else if (machine.state === 'warning') {
        ctx.fillStyle = '#f6ad55';
      } else {
        ctx.fillStyle = '#48bb78';
      }
      ctx.fill();
    }

    // Draw health bar
    const healthBarWidth = machine.width - 20;
    const healthBarHeight = 12;
    const healthBarX = machine.x + 10;
    const healthBarY = machine.y + machine.height - 25;

    // Health bar background
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Health bar fill
    const healthWidth = (machine.health / 100) * healthBarWidth;
    let healthColor = '#48bb78';
    if (machine.health <= 30) {
      healthColor = '#fc8181';
    } else if (machine.health <= 60) {
      healthColor = '#f6ad55';
    }
    ctx.fillStyle = healthColor;
    ctx.fillRect(healthBarX, healthBarY, healthWidth, healthBarHeight);

    // Health bar border
    ctx.strokeStyle = '#1a202c';
    ctx.lineWidth = 2;
    ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Machine type indicator
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`M${machine.type + 1}`, machine.x + machine.width / 2, machine.y + 70);

    // Status text
    if (machine.state === 'broken') {
      ctx.fillStyle = '#fc8181';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('FAILED', machine.x + machine.width / 2, machine.y + 95);
    }

    ctx.restore();
  }

  renderBackground(day: number, sleepDeprivation: number): void {
    // Darker background as sleep deprivation increases
    const darkness = Math.floor(sleepDeprivation * 0.3);
    this.ctx.fillStyle = `rgb(${26 - darkness}, ${26 - darkness}, ${46 - darkness})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid pattern
    this.ctx.strokeStyle = `rgba(74, 85, 104, ${0.3 - sleepDeprivation * 0.002})`;
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.canvas.width; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  applyScreenEffects(sleepDeprivation: number): void {
    if (sleepDeprivation > 30) {
      // Vignette effect
      const gradient = this.ctx.createRadialGradient(
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.canvas.width * 0.3,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, `rgba(0, 0, 0, ${sleepDeprivation * 0.006})`);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
