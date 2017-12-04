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
    byte2: number;
    byte3: number;
    byte4: number;
}

export { IOpcode, IOpcodeOptions };
