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

export function LD_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, byte);
    return true;
}
