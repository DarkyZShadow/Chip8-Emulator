import { ICanvasDrawOptions, ICanvasManagerOptions } from './interfaces';

class CanvasManager
{
    /* Properties */
    public color: string;
    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _canvasWidth: number;
    private readonly _canvasHeight: number;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _scale: number;
    private _isPathCreated: boolean;

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
        this.color = color || 'black';
        this._width = width;
        this._height = height;
        this._scale = scale || 10;
        this._canvasWidth = canvasWidth || width * this._scale;
        this._canvasHeight = canvasHeight || height * this._scale;
        this._isPathCreated = false;

        /* Create canvas */
        this._canvas = document.createElement('canvas');
        this._canvas.width = width * this._scale;
        this._canvas.height = height * this._scale;
        this._canvas.style.width = this._canvasWidth + 'px';
        this._canvas.style.height = this._canvasHeight + 'px';
        this._canvas.style.backgroundColor = backgroundColor || 'transparent';

        /* Setup context */
        this._ctx = this._canvas.getContext('2d');
        this._ctx.lineWidth = this._scale;
    }

    public bind(parent: HTMLElement): void
    {
        parent.appendChild(this._canvas);
    }

    public drawPoint(options: ICanvasDrawOptions): void
    {
        const { x, y } = options;

        this.initPath();
        this._ctx.rect(this.getDelta(x), this.getDelta(y), 1, 1);
    }

    public render(): boolean
    {
        if (!this._isPathCreated)
            return false;

        this._ctx.fillStyle = this.color;
        this._ctx.strokeStyle = this.color;
        this._ctx.stroke();
        this._isPathCreated = false;
        return true;
    }

    private getDelta(n: number): number
    {
        return n * this._scale + this._scale / 2;
    }

    private initPath(): void
    {
        if (this._isPathCreated)
            return;

        this._ctx.beginPath();
        this._isPathCreated = true;
    }
}

export default CanvasManager;
