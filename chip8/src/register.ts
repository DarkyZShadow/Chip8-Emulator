class Register
{
	private _value:number;

  	constructor() {
    	this._value = 0;
    }

  	public get value(): number {
    	return this._value;
    }

    public set value(newValue: number) {
    	this._value = newValue & 0xFF;
    }
}

export default Register;
