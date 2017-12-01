const app:HTMLElement = document.getElementById('app');

interface ICanvasManagerOptions
{
    width: number;
    height: number;
    scale?: number;
    canvasWidth?: number;
    canvasHeight?: number;
    backgroundColor?: string;
}

class CanvasManager
{
    /* Properties */
    private readonly ctx:CanvasRenderingContext2D;
    private readonly canvas:HTMLCanvasElement;
    private readonly canvasWidth:number;
    private readonly canvasHeight:number;
    private readonly width:number;
    private readonly height:number;
    private readonly scale:number;
    private isPathCreated:boolean;

    constructor(options: ICanvasManagerOptions)
    {
        const { width, height, scale, canvasWidth, canvasHeight, backgroundColor } = options;

        /* Some properties */
        this.width = width;
        this.height = height;
        this.scale = scale || 10;
        this.canvasWidth = canvasWidth || width * this.scale;
        this.canvasHeight = canvasHeight || height * this.scale;
        this.isPathCreated = false;

        /* Create canvas */
        this.canvas = document.createElement('canvas');
        this.canvas.width = width * this.scale;
        this.canvas.height = height * this.scale;
        this.canvas.style.width = this.canvasWidth + 'px';
        this.canvas.style.height = this.canvasHeight + 'px';
        this.canvas.style.backgroundColor = backgroundColor || 'transparent';

        /* Setup context */
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = this.scale;
    }

    public bind(parent: HTMLElement): void
    {
        parent.appendChild(this.canvas);
    }

    public test()
    {
        this.ctx.beginPath();

        this.ctx.moveTo(0, this.scale / 2);
        this.ctx.lineTo(this.width * this.scale, this.scale / 2);

        this.ctx.moveTo(0, this.height * this.scale - this.scale / 2);
        this.ctx.lineTo(this.width * this.scale, this.height * this.scale - this.scale / 2);

        this.ctx.stroke();
    }

    public drawPoint(x: number, y: number)
    {
        this.initPath();
        this.ctx.rect(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, this.scale, this.scale);
        /*this.ctx.moveTo(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2);
        this.ctx.lineTo((x + 1) * this.scale + this.scale / 2, (y + 1) * this.scale + this.scale / 2);
        console.log((x + 1) * this.scale + this.scale / 2, (y + 1) * this.scale + this.scale / 2);*/
    }

    public render(needToClosePath:boolean = false): boolean
    {
        if (!this.isPathCreated)
            return false;

        if (needToClosePath)
            this.ctx.closePath();

        this.ctx.stroke();
        this.isPathCreated = false;
    }

    private initPath()
    {
        if (this.isPathCreated)
            return;

        this.ctx.beginPath();
        this.isPathCreated = true;
    }
}

const options = {
    width: 64,
    height: 32,
    scale: 100,
    canvasWidth: 640,
    canvasHeight: 320,
    backgroundColor: 'white'
};
const manager:CanvasManager = new CanvasManager(options);

manager.bind(app);
//manager.drawPoint(0, 0);
manager.drawPoint(62, 30);
manager.render();

/*
** Specs : http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
**
** --------------------------------
**          Chip8 Opcodes:
** --------------------------------
**
** 00E0 	CLS
** 00EE 	RET
** 0NNN 	SYS addr
** 1NNN 	JP addr
** 2NNN 	CALL addr
** 3XNN 	SE Vx, byte
** 4XNN 	SNE Vx, byte
** 5XY0 	SE Vx, Vy
** 6XNN 	LD Vx, byte
** 7XNN 	ADD Vx, byte
** 8XY0 	LD Vx, Vy
** 8XY1 	OR Vx, Vy
** 8XY2 	AND Vx, Vy
** 8XY3 	XOR Vx, Vy
** 8XY4 	ADD Vx, Vy
** 8XY5 	SUB Vx, Vy
** 8XY6 	SHR Vx {, Vy}
** 8XY7 	SUBN Vx, Vy
** 8XYE 	SHL Vx {, Vy}
** 9XY0 	SNE Vx, Vy
** ANNN 	LD I, addr
** BNNN 	JP V0, addr
** CXNN 	RND Vx, byte
** DXYN 	DRW Vx, Vy, nibble
** EX9E 	SKP Vx
** EXA1 	SKNP Vx
** FX07 	LD Vx, DT
** FX0A 	LD Vx, K
** FX15 	LD DT, Vx
** FX18 	LD ST, Vx
** FX1E 	ADD I, Vx
** FX29 	LD F, Vx
** FX33 	LD B, Vx
** FX55 	LD [I], Vx
** FX65 	LD Vx, [I]
**
** --------------------------------
**          Super Chip-48:
** --------------------------------
**
** 00Cn     SCD nibble
** 00FB     SCR
** 00FC     SCL
** 00FD     EXIT
** 00FE     LOW
** 00FF     HIGH
** Dxy0     DRW Vx, Vy, 0
** Fx30     LD HF, Vx
** Fx75     LD R, Vx
** Fx85     LD Vx, R
*/
import CPU from './cpu';

const chip8:CPU = new CPU();
