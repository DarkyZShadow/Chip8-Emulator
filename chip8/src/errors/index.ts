class UnknownRegisterError extends Error
{
	constructor(registerName: number) {
        super('Unknow register with id ' + registerName);
    }
}

export { UnknownRegisterError };
