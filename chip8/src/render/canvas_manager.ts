import { ICanvasDrawOptions, ICanvasManagerOptions } from './interfaces';

class CanvasManager
{
    /* Properties */
    public color: string;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private readonly width: number;
    private readonly height: number;
    private readonly scale: number;
    private isPathCreated: boolean;

    constructor(options: ICanvasManagerOptions)
    {
        const {
            width,
            height,
            scale,
            canvasWidth,
            canvasHeight,
            backgroundColor,
            color
        } = options;

        /* Some properties */
        this.width = width;
        this.height = height;
        this.scale = scale || 10;
        this.color = color || 'black';
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

    public drawPoint(options: ICanvasDrawOptions): void
    {
        const { x, y } = options;

        this.initPath();
        this.ctx.rect(this.getDelta(x), this.getDelta(y), 1, 1);
    }

    public render(): boolean
    {
        if (!this.isPathCreated)
            return false;

        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.isPathCreated = false;
        return true;
    }

    private getDelta(n: number): number
    {
        return n * this.scale + this.scale / 2;
    }

    private initPath(): void
    {
        if (this.isPathCreated)
            return;

        this.ctx.beginPath();
        this.isPathCreated = true;
    }
}

export default CanvasManager;
