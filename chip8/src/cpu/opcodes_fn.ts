import CPU from './cpu';
import { IOpcodeOptions } from './interfaces';

export function NOP(options: IOpcodeOptions) { }

export function CLS(options: IOpcodeOptions)
{
    const { cpu } = options;

    cpu.canvasManager.clear();
}
