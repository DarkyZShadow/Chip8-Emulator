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
    byte1: number;
    byte2: number;
    byte3: number;
}

export { IOpcode, IOpcodeOptions };