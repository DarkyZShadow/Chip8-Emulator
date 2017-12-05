import CPU from './cpu';

interface IOpcode
{
    mask: number;
    id: number;
    fn: Function;
}

interface IOpcodeOptions
{
    cpu: CPU;
    x: number;
    y: number;
    n: number;
    kk: number;
    nnn: number;
}

export { IOpcode, IOpcodeOptions };
