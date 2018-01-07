import CanvasManager from './canvas_manager';
import { ICanvasManagerOptions, ICanvasDrawOptions } from './interfaces';

class Screen extends CanvasManager
{
    private _pixels: Uint8Array;

    constructor(options: ICanvasManagerOptions)
    {
        super(options);
        this._pixels = new Uint8Array(this.width * this.height);
    }

    public XORPoint(options: ICanvasDrawOptions): boolean
    {
        /*
        ** Sprites are XORed onto the existing screen.
        ** If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0.
        ** If the sprite is positioned so part of it is outside the coordinates of the display,
        **   it wraps around to the opposite side of the screen.
        */
        let { x, y } = options;

        /*x %= this.width;
        y %= this.heigth;*/
        if (x > this.width)
            x -= this.width;
        else if (x < 0)
            x += this.width;
        if (y > this.height)
            y -= this.height;
        else if (y < 0)
            y += this.height;

        !(this._pixels[y * this.width + x])
            ? this.drawPoint(options)
            : this.clearPoint(options)
        this._pixels[y * this.width + x] ^= 1;

        return !(this._pixels[y * this.width + x]);
    }
}

export default Screen;
