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
import * as fn from './opcodes_fn';

const opcodes:IOpcode[] = [
    /*
    ** --------------------------------
    **              Chip8
    ** --------------------------------
    */

    /* SYS addr (unused) */
	{
		mask: 0xF000,
		id: 0x0000,
		fn: fn.NOP
	},
	/* CLS */
	{
		mask: 0xFFFF,
		id: 0x00E0,
		fn: fn.CLS
	},
	/* RET */
	{
		mask: 0xFFFF,
		id: 0x00EE,
		fn: fn.RET
	},
	/* JP addr */
	{
		mask: 0xF000,
		id: 0x1000,
		fn: null
	},
	/* CALL addr */
	{
		mask: 0xF000,
		id: 0x2000,
		fn: null
	},
	/* SE Vx, byte */
	{
		mask: 0xF000,
		id: 0x3000,
		fn: fn.SE_Vx_Byte
	},
	/* SNE Vx, byte */
	{
		mask: 0xF000,
		id: 0x4000,
		fn: fn.SNE_Vx_Byte
	},
	/* SE Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x5000,
		fn: null
	},
	/* LD Vx, byte */
	{
		mask: 0xF000,
		id: 0x6000,
		fn: fn.LD_Vx_Byte
	},
	/* ADD Vx, byte */
	{
		mask: 0xF000,
		id: 0x7000,
		fn: null
	},
	/* LD Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8000,
		fn: null
	},
	/* OR Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8001,
		fn: null
	},
	/* AND Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8002,
		fn: null
	},
	/* XOR Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8003,
		fn: null
	},
	/* ADD Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8004,
		fn: null
	},
	/* SUB Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8005,
		fn: null
	},
	/* SHR Vx {, Vy} */
	{
		mask: 0xF00F,
		id: 0x8006,
		fn: null
	},
	/* SUBN Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x8007,
		fn: null
	},
	/* SHL Vx {, Vy} */
	{
		mask: 0xF00F,
		id: 0x800E,
		fn: null
	},
	/* SNE Vx, Vy */
	{
		mask: 0xF00F,
		id: 0x9000,
		fn: null
	},
	/* LD I, addr */
	{
		mask: 0xF000,
		id: 0xA000,
		fn: null
	},
	/* JP V0, addr */
	{
		mask: 0xF000,
		id: 0xB000,
		fn: null
	},
	/* RND Vx, byte */
	{
		mask: 0xF000,
		id: 0xC000,
		fn: null
	},
	/* DRW Vx, Vy, nibble */
	{
		mask: 0xF000,
		id: 0xD000,
		fn: null
	},
	/* SKP Vx */
	{
		mask: 0xF0FF,
		id: 0xE09E,
		fn: null
	},
	/* SKNP Vx */
	{
		mask: 0xF0FF,
		id: 0xE0A1,
		fn: null
	},
	/* LD Vx, DT */
	{
		mask: 0xF0FF,
		id: 0xF007,
		fn: null
	},
	/* LD Vx, K */
	{
		mask: 0xF0FF,
		id: 0xF00A,
		fn: null
	},
	/* LD DT, Vx */
	{
		mask: 0xF0FF,
		id: 0xF015,
		fn: null
	},
	/* LD ST, Vx */
	{
		mask: 0xF0FF,
		id: 0xF018,
		fn: null
	},
	/* ADD I, Vx */
	{
		mask: 0xF0FF,
		id: 0xF01E,
		fn: null
	},
	/* LD F, Vx */
	{
		mask: 0xF0FF,
		id: 0xF029,
		fn: null
	},
	/* LD B, Vx */
	{
		mask: 0xF0FF,
		id: 0xF033,
		fn: null
	},
	/* LD [I], Vx */
	{
		mask: 0xF0FF,
		id: 0xF055,
		fn: null
	},
	/* LD Vx, [I] */
	{
		mask: 0xF0FF,
		id: 0xF065,
		fn: null
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
		fn: null
	},
	/* SCR */
	{
		mask: 0xFFFF,
		id: 0x00FB,
		fn: null
	},
	/* SCL */
	{
		mask: 0xFFFF,
		id: 0x00FC,
		fn: null
	},
	/* EXIT */
	{
		mask: 0xFFFF,
		id: 0x00FD,
		fn: null
	},
	/* LOW */
	{
		mask: 0xFFFF,
		id: 0x00FE,
		fn: null
	},
	/* HIGH */
	{
		mask: 0xFFFF,
		id: 0x00FF,
		fn: null
	},
	/* DRW Vx, Vy, 0 */
	{
		mask: 0xF00F,
		id: 0xD000,
		fn: null
	},
	/* LD HF, Vx */
	{
		mask: 0xF0FF,
		id: 0xF030,
		fn: null
	},
	/* LD R, Vx */
	{
		mask: 0xF0FF,
		id: 0xF075,
		fn: null
	},
	/* LD Vx, R */
	{
		mask: 0xF0FF,
		id: 0xF085,
		fn: null
	}
];

export default opcodes;
