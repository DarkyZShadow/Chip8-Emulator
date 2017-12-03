/*
** Specs : http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
**
** --------------------------------
**          Chip8 Opcodes:
** --------------------------------
**
** 00E0 	CLS
** 00EE 	RET
** 0NNN 	SYS addr
** 1NNN 	JP addr
** 2NNN 	CALL addr
** 3XNN 	SE Vx, byte
** 4XNN 	SNE Vx, byte
** 5XY0 	SE Vx, Vy
** 6XNN 	LD Vx, byte
** 7XNN 	ADD Vx, byte
** 8XY0 	LD Vx, Vy
** 8XY1 	OR Vx, Vy
** 8XY2 	AND Vx, Vy
** 8XY3 	XOR Vx, Vy
** 8XY4 	ADD Vx, Vy
** 8XY5 	SUB Vx, Vy
** 8XY6 	SHR Vx {, Vy}
** 8XY7 	SUBN Vx, Vy
** 8XYE 	SHL Vx {, Vy}
** 9XY0 	SNE Vx, Vy
** ANNN 	LD I, addr
** BNNN 	JP V0, addr
** CXNN 	RND Vx, byte
** DXYN 	DRW Vx, Vy, nibble
** EX9E 	SKP Vx
** EXA1 	SKNP Vx
** FX07 	LD Vx, DT
** FX0A 	LD Vx, K
** FX15 	LD DT, Vx
** FX18 	LD ST, Vx
** FX1E 	ADD I, Vx
** FX29 	LD F, Vx
** FX33 	LD B, Vx
** FX55 	LD [I], Vx
** FX65 	LD Vx, [I]
**
** --------------------------------
**          Super Chip-48:
** --------------------------------
**
** 00Cn     SCD nibble
** 00FB     SCR
** 00FC     SCL
** 00FD     EXIT
** 00FE     LOW
** 00FF     HIGH
** Dxy0     DRW Vx, Vy, 0
** Fx30     LD HF, Vx
** Fx75     LD R, Vx
** Fx85     LD Vx, R
*/
import { IOpcode } from './interfaces';

const opcodes:IOpcode[] = [
    /*
    ** --------------------------------
    **              Chip8
    ** --------------------------------
    */

	/* CLS */
	{
		mask: 0xFFFF,
		id: 0x00E0,
		fn() { }
	},
	/* RET */
	{
		mask: 0xFFFF,
		id: 0x00EE,
		fn() { }
	},
	/* SYS addr */
	{
		mask: 0xF000,
		id: 0x0000,
		fn() { }
	},
	/* JP addr */
	{
		mask: 0xF000,
		id: 0x1000,
		fn() { }
	},
	/* CALL addr */
	{
		mask: 0xF000,
		id: 0x2000,
		fn() { }
	},
	/* SE Vx, byte */
	{
		mask: 0xF000,
		id: 0x3000,
		fn() { }
	},
	/* SNE Vx, byte */
	{
		mask: 0xF000,
		id: 0x4000,
		fn() { }
	},
	/* SE Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x5000,
		fn() { }
	},
	/* LD Vx, byte */
	{
		mask: 0xF000,
		id: 0x6000,
		fn() { }
	},
	/* ADD Vx, byte */
	{
		mask: 0xF000,
		id: 0x7000,
		fn() { }
	},
	/* LD Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8000,
		fn() { }
	},
	/* OR Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8001,
		fn() { }
	},
	/* AND Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8002,
		fn() { }
	},
	/* XOR Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8003,
		fn() { }
	},
	/* ADD Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8004,
		fn() { }
	},
	/* SUB Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8005,
		fn() { }
	},
	/* SHR Vx {, Vy} */
	{
		mask: 0xF00F,
		id: 0x8006,
		fn() { }
	},
	/* SUBN Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8007,
		fn() { }
	},
	/* SHL Vx {, Vy} */
	{
		mask: 0xF00F,
		id: 0x800E,
		fn() { }
	},
	/* SNE Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x9000,
		fn() { }
	},
	/* LD I, addr */
	{
		mask: 0xF000,
		id: 0xA000,
		fn() { }
	},
	/* JP V0, addr */
	{
		mask: 0xF000,
		id: 0xB000,
		fn() { }
	},
	/* RND Vx, byte */
	{
		mask: 0xF000,
		id: 0xC000,
		fn() { }
	},
	/* DRW Vx, Vy, nibble */
	{
		mask: 0xF000,
		id: 0xD000,
		fn() { }
	},
	/* SKP Vx */
	{
		mask: 0xF0FF,
		id: 0xE09E,
		fn() { }
	},
	/* SKNP Vx */
	{
		mask: 0xF0FF,
		id: 0xE0A1,
		fn() { }
	},
	/* LD Vx, DT */
	{
		mask: 0xF0FF,
		id: 0xF007,
		fn() { }
	},
	/* LD Vx, K */
	{
		mask: 0xF0FF,
		id: 0xF00A,
		fn() { }
	},
	/* LD DT, Vx */
	{
		mask: 0xF0FF,
		id: 0xF015,
		fn() { }
	},
	/* LD ST, Vx */
	{
		mask: 0xF0FF,
		id: 0xF018,
		fn() { }
	},
	/* ADD I, Vx */
	{
		mask: 0xF0FF,
		id: 0xF01E,
		fn() { }
	},
	/* LD F, Vx */
	{
		mask: 0xF0FF,
		id: 0xF029,
		fn() { }
	},
	/* LD B, Vx */
	{
		mask: 0xF0FF,
		id: 0xF033,
		fn() { }
	},
	/* LD [I], Vx */
	{
		mask: 0xF0FF,
		id: 0xF055,
		fn() { }
	},
	/* LD Vx, [I] */
	{
		mask: 0xF0FF,
		id: 0xF065,
		fn() { }
    },

    /*
    ** --------------------------------
    **          Super Chip-48:
    ** --------------------------------
    */

	/* SCD nibble */
	{
		mask: 0xFFF0,
		id: 0x00C0,
		fn() { }
	},
	/* SCR */
	{
		mask: 0xFFFF,
		id: 0x00FB,
		fn() { }
	},
	/* SCL */
	{
		mask: 0xFFFF,
		id: 0x00FC,
		fn() { }
	},
	/* EXIT */
	{
		mask: 0xFFFF,
		id: 0x00FD,
		fn() { }
	},
	/* LOW */
	{
		mask: 0xFFFF,
		id: 0x00FE,
		fn() { }
	},
	/* HIGH */
	{
		mask: 0xFFFF,
		id: 0x00FF,
		fn() { }
	},
	/* DRW Vx, Vy, 0 */
	{
		mask: 0xF00F,
		id: 0xD000,
		fn() { }
	},
	/* LD HF, Vx */
	{
		mask: 0xF0FF,
		id: 0xF030,
		fn() { }
	},
	/* LD R, Vx */
	{
		mask: 0xF0FF,
		id: 0xF075,
		fn() { }
	},
	/* LD Vx, R */
	{
		mask: 0xF0FF,
		id: 0xF085,
		fn() { }
	}
];

export default opcodes;
