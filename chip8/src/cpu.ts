import { CanvasManager } from './render';

const COUNT_OF_GEN_REGS = 0xF;
const MEMORY_SIZE = 4096;
const FIRST_ADDRESS = 512;
const MAX_JUMPS = 16;

class CPU
{
    private readonly _frequency: number;
    private readonly _canvasManager: CanvasManager;
    private readonly _V: Int8Array;
    private readonly _memory: Int8Array;
    private readonly _jumps: Int16Array;
    private  _I: number;
    private _jumpCounter: number;
    private _gameCounter: number;
    private _soundCounter: number;
    private _programCounter: number;

    /* Update counter*/
    private _lastFrameUpdate: number;
    private _delta: number;
    private _timestep: number;

    constructor(canvasManager: CanvasManager, hzFrequency: number) {
        this._V = new Int8Array(COUNT_OF_GEN_REGS + 1);
        this._memory = new Int8Array(MEMORY_SIZE);
        this._jumps = new Int16Array(MAX_JUMPS);
        this._programCounter = FIRST_ADDRESS;
        this._I = 0;
        this._jumpCounter = 0;
        this._gameCounter = 0;
        this._soundCounter = 0;
        this._frequency = hzFrequency;
        this._canvasManager = canvasManager;
        this._lastFrameUpdate = -1;
        this._delta = 0;
        this._timestep = 1000 / hzFrequency;
    }

    public loadRom(buffer: ArrayBuffer)
    {
        this._memory.set(new Uint8Array(buffer), FIRST_ADDRESS);
    }

    public run(): void
    {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(timestamp: number)/*: void*/
    {
        /* Get time since last update */
        if (this._lastFrameUpdate > 0)
            this._delta += timestamp - this._lastFrameUpdate;

        /* Do X operations per seconds */
        while (this._delta >= this._timestep)
        {
            this.update();
            this._delta -= this._timestep;
        }

        /* Render & set timestamp */
        this._canvasManager.render();
        this._lastFrameUpdate = timestamp;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update(): void
    {
        this._canvasManager.drawPoint({ x: Math.random() * 64, y: Math.random() * 32 });
    }
}

export default CPU;
