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
}

export { IOpcode, IOpcodeOptions };
