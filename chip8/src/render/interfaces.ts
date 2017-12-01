interface ICanvasManagerOptions
{
    width: number;
    height: number;
    scale?: number;
    canvasWidth?: number;
    canvasHeight?: number;
    backgroundColor?: string;
    color?: string
}

interface ICanvasDrawOptions
{
    x: number;
    y: number;
}

export { ICanvasDrawOptions, ICanvasManagerOptions };
