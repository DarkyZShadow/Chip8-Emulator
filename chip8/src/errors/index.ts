class UnknownRegisterError extends Error
{
	constructor(registerName: string) {
        super('Unknow register named ' + registerName);
    }
}

export { UnknownRegisterError };
