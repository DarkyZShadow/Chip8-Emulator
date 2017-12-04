import CPU from './cpu';
import { IOpcodeOptions } from './interfaces';

export function NOP(options: IOpcodeOptions): boolean
{
    return true;
}

export function CLS(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.canvasManager.clear();
    return true;
}

export function RET(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.programCounter = cpu.popStack();
    return false;
}
