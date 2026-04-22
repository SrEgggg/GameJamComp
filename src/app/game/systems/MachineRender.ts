import MA0_src from '@/app/Sprites/MA0.png';
import MA1_src from '@/app/Sprites/MA1.png';
import MA2_src from '@/app/Sprites/MA2.png';
import MA3_src from '@/app/Sprites/MA3.png';
import MB0_src from '@/app/Sprites/MB0.png';
import MBA1_src from '@/app/Sprites/MBA1.png';
import MBA2_src from '@/app/Sprites/MBA2.png';
import MBB1_src from '@/app/Sprites/MBB1.png';
import MBB2_src from '@/app/Sprites/MBB2.png';
import MBC1_src from '@/app/Sprites/MBC1.png';
import MBC2_src from '@/app/Sprites/MBC2.png';
import MC0_src from '@/app/Sprites/MC0.png';
import MC1_src from '@/app/Sprites/MC1.png';
import MC2_src from '@/app/Sprites/MC2.png';
import { Machine } from '../entities/Machine';

const Sprites: Record<string, HTMLImageElement> = {};

const load = (name: string, src: string) => {
    const img = new Image();
    img.src = src;
    Sprites[name] = img;
};

load('MA0', MA0_src); 
load('MA1', MA1_src); 
load('MA2', MA2_src); 
load('MA3', MA3_src);
load('MB0', MB0_src); 
load('MBA1', MBA1_src); 
load('MBA2', MBA2_src);
load('MBB1', MBB1_src); 
load('MBB2', MBB2_src); 
load('MBC1', MBC1_src); 
load('MBC2', MBC2_src);
load('MC0', MC0_src); 
load('MC1', MC1_src); 
load('MC2', MC2_src);

export class MachineRender {

    public static render(ctx: CanvasRenderingContext2D, machine: Machine): void {
        this.drawBaseBody(ctx, machine);
    }
  
 

    private static drawBaseBody(ctx: CanvasRenderingContext2D, machine: Machine): void {
        const { x, y, width, height, variant } = machine;

        let XCoordinate = x;
        let YCoordinate = y;

        // Add shake effect for critical machines
        if (machine.state === 'critical') {
            XCoordinate = x + (Math.random() - 0.5) * 4;
            YCoordinate = y + (Math.random() - 0.5) * 4;
            //ctx.translate(XCoordinate, YCoordinate);
        }

        switch (variant) {
        case 'MA': 
            ctx.drawImage(Sprites.MA0, XCoordinate, YCoordinate, width, height);
            break;
        case 'MB': 
            ctx.drawImage(Sprites.MB0, XCoordinate, YCoordinate, width, height);
            break;
        case 'MC': 
            ctx.drawImage(Sprites.MC0, XCoordinate, YCoordinate, width, height);
            break;
        }

        this.drawOverlays(ctx, machine, XCoordinate, YCoordinate);

        
    }

    private static drawOverlays(ctx: CanvasRenderingContext2D, machine: Machine, x: number, y: number): void {
        const { variant, state } = machine;

        if (variant === 'MA') {
            if (state === 'idle') ctx.drawImage(Sprites.MA1, x, y, machine.width, machine.height);
            else if (state === 'warning') ctx.drawImage(Sprites.MA2, x, y, machine.width, machine.height);
            else if (state === 'critical') ctx.drawImage(Sprites.MA3, x, y, machine.width, machine.height);
        }

        if (variant === 'MC') {
            if (state === 'idle') ctx.drawImage(Sprites.MC1, x, y, machine.width, machine.height);
            else if (state === 'warning') ctx.drawImage(Sprites.MC2, x, y, machine.width, machine.height);
            else if (state === 'critical') {
                ctx.drawImage(Sprites.MC2, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MC1, x, y, machine.width, machine.height);
            }
        }

        if (variant === 'MB') {
            if (state === 'idle') {
                ctx.drawImage(Sprites.MBA1, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBB1, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBC1, x, y, machine.width, machine.height);
            } else if (state === 'warning') {
                ctx.drawImage(Sprites.MBA2, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBB2, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBC2, x, y, machine.width, machine.height);
            } else if (state === 'critical') {
                ctx.drawImage(Sprites.MBA1, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBB1, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBC1, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBA2, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBB2, x, y, machine.width, machine.height);
                ctx.drawImage(Sprites.MBC2, x, y, machine.width, machine.height);  
            }
        }   
    }
}