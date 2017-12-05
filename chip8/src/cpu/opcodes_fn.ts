import CPU from './cpu';
import { IOpcodeOptions } from './interfaces';

export function NOP(options: IOpcodeOptions): boolean
{
    return true;
}

/*
** 00E0 - CLS
** Clear the display.
*/
export function CLS(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.canvasManager.clear();
    return true;
}

/*
** 00EE - RET
** Return from a subroutine.
**
** The interpreter sets the program counter to the address at the top of the stack, then subtracts 1 from the stack pointer.
*/
export function RET(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.programCounter = cpu.popStack();
    return false;
}

/*
** 1nnn - JP addr
** Jump to location nnn.
**
** The interpreter sets the program counter to nnn.
*/
export function JMP(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const address = (byte2 << 8) + (byte3 << 4) + byte4;

    cpu.programCounter = address;
    return false;
}

/*
** 2nnn - CALL addr
** Call subroutine at nnn.
**
** The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is then set to nnn.
*/
export function CALL(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const address = (byte2 << 8) + (byte3 << 4) + byte4;

    cpu.pushStack(address);
    cpu.programCounter = address;
    return false;
}

/*
** 3xkk - SE Vx, byte
** Skip next instruction if Vx = kk.
**
** The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
*/
export function SE_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    if (cpu.getRegister(byte2) === byte)
        cpu.increaseProgramCounter(2);
    return true;
}

/*
** 4xkk - SNE Vx, byte
** Skip next instruction if Vx != kk.
**
** The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
*/
export function SNE_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    if (cpu.getRegister(byte2) !== byte)
        cpu.increaseProgramCounter(2);
    return true;
}

/*
** 5xy0 - SE Vx, Vy
** Skip next instruction if Vx = Vy.
**
** The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.
*/
export function SE_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const reg1 = cpu.getRegister(byte2);
    const reg2 = cpu.getRegister(byte3);

    if (reg1 === reg2)
        cpu.increaseProgramCounter(2);
    return true;
}

/*
** 6xkk - LD Vx, byte
** Set Vx = kk.
**
** The interpreter puts the value kk into register Vx.
*/
export function LD_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, byte);
    return true;
}

/*
** 7xkk - ADD Vx, byte
** Set Vx = Vx + kk.
**
** Adds the value kk to the value of register Vx, then stores the result in Vx.
*/
export function ADD_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, cpu.getRegister(byte2) + byte);
    return true;
}

/*
** 8xy0 - LD Vx, Vy
** Set Vx = Vy.
**
** Stores the value of register Vy in register Vx.
*/
export function LD_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;

    cpu.setRegister(byte2, cpu.getRegister(byte3));
    return true;
}

/*
** 8xy1 - OR Vx, Vy
** Set Vx = Vx OR Vy.
**
** Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. A bitwise OR compares the corrseponding bits from two values, and if either bit is 1, then the same bit in the result is also 1. Otherwise, it is 0.
*/
export function OR_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;

    cpu.setRegister(byte2, cpu.getRegister(byte2) | cpu.getRegister(byte3));
    return true;
}

/*
** 8xy2 - AND Vx, Vy
** Set Vx = Vx AND Vy.
**
** Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx. A bitwise AND compares the corrseponding bits from two values, and if both bits are 1, then the same bit in the result is also 1. Otherwise, it is 0.
*/
export function AND_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;

    cpu.setRegister(byte2, cpu.getRegister(byte2) & cpu.getRegister(byte3));
    return true;
}

/*
** 8xy3 - XOR Vx, Vy
** Set Vx = Vx XOR Vy.
**
** Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx. An exclusive OR compares the corrseponding bits from two values, and if the bits are not both the same, then the corresponding bit in the result is set to 1. Otherwise, it is 0.
*/
export function XOR_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;

    cpu.setRegister(byte2, cpu.getRegister(byte2) ^ cpu.getRegister(byte3));
    return true;
}

/*
** 8xy4 - ADD Vx, Vy
** Set Vx = Vx + Vy, set VF = carry.
**
** The values of Vx and Vy are added together. If the result is greater than 8 bits (i.e., > 255,) VF is set to 1, otherwise 0. Only the lowest 8 bits of the result are kept, and stored in Vx.
*/
export function ADD_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const vx = cpu.getRegister(byte2);
    const vy = cpu.getRegister(byte3);

    if ((vx + vy) > 0xFF)
        cpu.setRegister(0x0F, 1);

    cpu.setRegister(byte2, (vx + vy) & 0xFF);
    return true;
}

/*
** 8xy5 - SUB Vx, Vy
** Set Vx = Vx - Vy, set VF = NOT borrow.
**
** If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
*/
export function SUB_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const vx = cpu.getRegister(byte2);
    const vy = cpu.getRegister(byte3);

    if (vx > vy)
        cpu.setRegister(0x0F, 1);

    cpu.setRegister(byte2, (vx - vy) & 0xFF);
    return true;
}

/*
** /!\ Not sure ! /!\
**
** 8xy6 - SHR Vx {, Vy}
** Set Vx = Vx SHR 1.
**
** If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
*/
export function SHR_Vx(options: IOpcodeOptions): boolean
{
    const { cpu, byte2 } = options;
    const vx = cpu.getRegister(byte2);

    cpu.setRegister(0x0F, vx & 0x01);
    cpu.setRegister(byte2, vx >> 0x01);
    return true;
}

/*
** 8xy7 - SUBN Vx, Vy
** Set Vx = Vy - Vx, set VF = NOT borrow.
**
** If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
*/
export function SUBN_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const vx = cpu.getRegister(byte2);
    const vy = cpu.getRegister(byte3);

    if (vy > vx)
        cpu.setRegister(0x0F, 1);

    cpu.setRegister(byte2, (vy - vx) & 0xFF);
    return true;
}

/*
** 8xyE - SHL Vx {, Vy}
** Set Vx = Vx SHL 1.
**
** If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0. Then Vx is multiplied by 2.
*/
export function SHL_Vx(options: IOpcodeOptions): boolean
{
    const { cpu, byte2 } = options;
    const vx = cpu.getRegister(byte2);

    cpu.setRegister(0x0F, vx >> 0x07);
    cpu.setRegister(byte2, vx << 0x01);
    return true;
}

/*
** 9xy0 - SNE Vx, Vy
** Skip next instruction if Vx != Vy.
**
** The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.
*/
export function SNE_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const vx = cpu.getRegister(byte2);
    const vy = cpu.getRegister(byte3);

    if (vx !== vy)
        cpu.increaseProgramCounter(2);
    return true;
}

/*
** Annn - LD I, addr
** Set I = nnn.
**
** The value of register I is set to nnn.
*/
export function LD_I_Addr(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const address = (byte2 << 8) + (byte3 << 4) + byte4;

    cpu.I = address;
    return true;
}

/*
** Bnnn - JP V0, addr
** Jump to location nnn + V0.
**
** The program counter is set to nnn plus the value of V0.
*/
export function JP_V0_Addr(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const address = (byte2 << 8) + (byte3 << 4) + byte4;
    const v0 = cpu.getRegister(0x00);

    cpu.programCounter = address + v0;
    return true;
}

/*
** Cxkk - RND Vx, byte
** Set Vx = random byte AND kk.
**
** The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results are stored in Vx. See instruction 8xy2 for more information on AND.
*/
export function RND_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, Math.floor(Math.random() * byte));
    return true;
}

/*
** Dxyn - DRW Vx, Vy, nibble
** Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
**
** The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen. If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of the screen. See instruction 8xy3 for more information on XOR, and section 2.4, Display, for more information on the Chip-8 screen and sprites.
*/
export function DRW_Vx_Vy_Nibble(options: IOpcodeOptions): boolean
{
    /* 0 1 8 */
    const { cpu, byte2, byte3, byte4 } = options;
    const buffer: Uint8Array = cpu.memory.slice(cpu.I, cpu.I + byte4);
    let vx = cpu.getRegister(byte2);
    let vy = cpu.getRegister(byte3);

    cpu.setRegister(0x0F, 0);

    /* TODO: Draw */
    /*
    ** These bytes are then displayed as sprites on screen at coordinates (Vx, Vy).
    ** Sprites are XORed onto the existing screen.
    ** If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0.
    ** If the sprite is positioned so part of it is outside the coordinates of the display,
    **   it wraps around to the opposite side of the screen.
    */
    for (let y = 0; y < byte4; ++y)
    {
        let line = buffer[y];
        let mask = 1;

        for (let x = 0; x < 8; ++x)
        {
            /*
            ** x, y     = buffer[y] & 0b10000000‬ >> 7
            ** x+1, y   = buffer[y] & 0b01000000 >> 6
            ** ...
            ** x+7, y   = buffer[y] & 0b00000001 >> 0
            */
            if (((line & mask) >> x) === 1)
                cpu.canvasManager.drawPoint({ x: 7 - x + vx, y: y + vy });
            mask *= 2;
        }
    }
    cpu.canvasManager.render();
    return true;
}


/*
Ex9E - SKP Vx
Skip next instruction if key with the value of Vx is pressed.

Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC is increased by 2.


ExA1 - SKNP Vx
Skip next instruction if key with the value of Vx is not pressed.

Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is increased by 2.


Fx07 - LD Vx, DT
Set Vx = delay timer value.

The value of DT is placed into Vx.


Fx0A - LD Vx, K
Wait for a key press, store the value of the key in Vx.

All execution stops until a key is pressed, then the value of that key is stored in Vx.


Fx15 - LD DT, Vx
Set delay timer = Vx.

DT is set equal to the value of Vx.


Fx18 - LD ST, Vx
Set sound timer = Vx.

ST is set equal to the value of Vx.


Fx1E - ADD I, Vx
Set I = I + Vx.

The values of I and Vx are added, and the results are stored in I.
*/



/*
** Fx29 - LD F, Vx
** Set I = location of sprite for digit Vx.
**
** The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx. See section 2.4, Display, for more information on the Chip-8 hexadecimal font.
*/
export function LD_F_Vx(options: IOpcodeOptions): boolean
{
    const { cpu, byte2 } = options;

    /*
    ** 1 = 0 -> 4
    ** 2 = 5 -> 9
    ** ...
    ** F = 4B -> 4F
    */
    cpu.I = cpu.getRegister(byte2) * 5;
    return true;
}


/*
Fx33 - LD B, Vx
Store BCD representation of Vx in memory locations I, I+1, and I+2.

The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.


Fx55 - LD [I], Vx
Store registers V0 through Vx in memory starting at location I.

The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.


Fx65 - LD Vx, [I]
Read registers V0 through Vx from memory starting at location I.

The interpreter reads values from memory starting at location I into registers V0 through Vx.
*/
