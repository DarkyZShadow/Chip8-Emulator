import { CanvasManager } from '../render';
import opcodes from './opcodes';
import { IOpcode } from './interfaces';

const COUNT_OF_GEN_REGS = 0xF;
const MEMORY_SIZE = 4096;
const FIRST_ADDRESS = 512;
const MAX_JUMPS = 16;

class CPU
{
    /* General properties */
    private _animationHandle: number;
    private readonly _frequency: number;
    private readonly _canvasManager: CanvasManager;

    /* Memory properties */
    private readonly _V: Uint8Array;
    private readonly _memory: Uint8Array;
    private readonly _stack: Uint16Array;
    private  _I: number;
    private _stackPointer: number;
    private _programCounter: number;

    /* Update counter*/
    private _lastFrameUpdate: number;
    private _delta: number;
    private _timestep: number;

    /* Constructor */
    constructor(canvasManager: CanvasManager, hzFrequency: number) {
        this._V = new Uint8Array(COUNT_OF_GEN_REGS + 1);
        this._memory = new Uint8Array(MEMORY_SIZE);
        this._stack = new Uint16Array(MAX_JUMPS);
        this._programCounter = FIRST_ADDRESS;
        this._I = 0;
        this._stackPointer = 0;
        this._frequency = hzFrequency;
        this._canvasManager = canvasManager;
        this._lastFrameUpdate = -1;
        this._animationHandle = -1;
        this._delta = 0;
        this._timestep = 1000 / hzFrequency;
    }

    /*
    ** Getters/Setters
    */

    public get canvasManager(): CanvasManager
    {
        return this._canvasManager;
    }

    public set programCounter(value: number)
    {
        this._programCounter = value;
    }

    /*
    ** Functions
    */

    public loadRom(buffer: ArrayBuffer)
    {
        this._memory.set(new Uint8Array(buffer), FIRST_ADDRESS);
    }

    public run(): void
    {
        this._animationHandle = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public suspend(): void
    {
        cancelAnimationFrame(this._animationHandle);
        this._lastFrameUpdate = 0;
    }

    public pushStack(value: number): void
    {
        this._stack[this._stackPointer] = value;
        this._stackPointer++;
    }

    public popStack(): number
    {
        let result;

        this._stackPointer--;
        result = this._stack[this._stackPointer];
        this._stack[this._stackPointer] = 0;
        return result;
    }

    private gameLoop(timestamp: number): void
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

        /* Loop */
        this._animationHandle = requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update(): void
    {
        const firstByte = this._memory[this._programCounter];
        const secondByte = this._memory[this._programCounter + 1];
        const opcode:number = (firstByte << 8) + secondByte;
        const op:IOpcode = opcodes.find((op: IOpcode): boolean => {
            return (opcode & op.mask) === op.id;
        });

        if (op.fn({ cpu: this }) === true)
            this._programCounter += 2;
    }
}

export default CPU;