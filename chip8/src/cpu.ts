import Register from './register';
import { IRegisters } from './interfaces';
import { UnknownRegisterError } from './error';

class CPU
{
	private _registers:IRegisters;

    constructor() {
    	this._registers = {}
    	for (let i = 0; i <= 0xF; ++i)
        	this._registers['V' + i.toString(16).toUpperCase()] = new Register();
    }

    public getRegister(name: string): number {
    	const register = this._registers[name.toUpperCase()];

        if (register === undefined)
        	throw new UnknownRegisterError(name);
    	return register.value;
    }

    public setRegister(name: string, value: number): void {
    	const register = this._registers[name.toUpperCase()];

        if (register === undefined)
        	throw new UnknownRegisterError(name);
    	register.value = value;
    }
}

export default CPU;
