const COUNT_OF_GEN_REGS = 0xF;
const MEMORY_SIZE = 4096;
const FIRST_ADDRESS = 512;
const MAX_JUMPS = 16;

class CPU
{
    private _V:Int8Array;
    private _memory:Int8Array;
    private _jumps:Int16Array;
    private _I:number;
    private _jumpCounter:number;
    private _gameCounter:number;
    private _soundCounter:number;
    private _programCounter:number;

    constructor() {
        this._V = new Int8Array(COUNT_OF_GEN_REGS + 1);
        this._memory = new Int8Array(MEMORY_SIZE);
        this._jumps = new Int16Array(MAX_JUMPS);
        this._programCounter = FIRST_ADDRESS;
        this._I = 0;
        this._jumpCounter = 0;
        this._gameCounter = 0;
        this._soundCounter = 0;
    }
}

export default CPU;
