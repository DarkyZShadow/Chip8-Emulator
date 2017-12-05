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
import { RND_Vx_Byte } from './opcodes_fn';

const opcodes:IOpcode[] = [
    /*
    ** --------------------------------
    **              Chip8
    ** --------------------------------
    */
	{ id: 0x0000, mask: 0xF000, fn: fn.NOP },               /* SYS addr (unused) */
	{ id: 0x00E0, mask: 0xFFFF, fn: fn.CLS },               /* CLS */
	{ id: 0x00EE, mask: 0xFFFF, fn: fn.RET },               /* RET */
	{ id: 0x1000, mask: 0xF000, fn: fn.JMP },               /* JP addr */
	{ id: 0x2000, mask: 0xF000, fn: fn.CALL },              /* CALL addr */
	{ id: 0x3000, mask: 0xF000, fn: fn.SE_Vx_Byte },        /* SE Vx, byte */
	{ id: 0x4000, mask: 0xF000, fn: fn.SNE_Vx_Byte },       /* SNE Vx, byte */
	{ id: 0x5000, mask: 0xF00F, fn: fn.SE_Vx_Vy },          /* SE Vx, Vy */
	{ id: 0x6000, mask: 0xF000, fn: fn.LD_Vx_Byte },        /* LD Vx, byte */
	{ id: 0x7000, mask: 0xF000, fn: fn.ADD_Vx_Byte },       /* ADD Vx, byte */
	{ id: 0x8000, mask: 0xF00F, fn: fn.LD_Vx_Vy },          /* LD Vx, Vy */
	{ id: 0x8001, mask: 0xF00F, fn: null },                 /* OR Vx, Vy */
	{ id: 0x8002, mask: 0xF00F, fn: fn.AND_Vx_Vy },         /* AND Vx, Vy */
	{ id: 0x8003, mask: 0xF00F, fn: fn.XOR_Vx_Vy },         /* XOR Vx, Vy */
	{ id: 0x8004, mask: 0xF00F, fn: fn.ADD_Vx_Vy },         /* ADD Vx, Vy */
	{ id: 0x8005, mask: 0xF00F, fn: fn.SUB_Vx_Vy },         /* SUB Vx, Vy */
	{ id: 0x8006, mask: 0xF00F, fn: null },                 /* SHR Vx {, Vy} */
	{ id: 0x8007, mask: 0xF00F, fn: null },                 /* SUBN Vx, Vy */
	{ id: 0x800E, mask: 0xF00F, fn: fn.SHL_Vx },            /* SHL Vx {, Vy} */
	{ id: 0x9000, mask: 0xF00F, fn: null },                 /* SNE Vx, Vy */
	{ id: 0xA000, mask: 0xF000, fn: fn.LD_I_Addr },         /* LD I, addr */
	{ id: 0xB000, mask: 0xF000, fn: null },                 /* JP V0, addr */
	{ id: 0xC000, mask: 0xF000, fn: RND_Vx_Byte },          /* RND Vx, byte */
	{ id: 0xD000, mask: 0xF000, fn: fn.DRW_Vx_Vy_Nibble },  /* DRW Vx, Vy, nibble */
	{ id: 0xE09E, mask: 0xF0FF, fn: null },                 /* SKP Vx */
	{ id: 0xE0A1, mask: 0xF0FF, fn: null },                 /* SKNP Vx */
	{ id: 0xF007, mask: 0xF0FF, fn: null },                 /* LD Vx, DT */
	{ id: 0xF00A, mask: 0xF0FF, fn: null },                 /* LD Vx, K */
	{ id: 0xF015, mask: 0xF0FF, fn: null },                 /* LD DT, Vx */
	{ id: 0xF018, mask: 0xF0FF, fn: null },                 /* LD ST, Vx */
	{ id: 0xF01E, mask: 0xF0FF, fn: fn.ADD_I_Vx },          /* ADD I, Vx */
	{ id: 0xF029, mask: 0xF0FF, fn: fn.LD_F_Vx },           /* LD F, Vx */
	{ id: 0xF033, mask: 0xF0FF, fn: null },                 /* LD B, Vx */
	{ id: 0xF055, mask: 0xF0FF, fn: null },                 /* LD [I], Vx */
	{ id: 0xF065, mask: 0xF0FF, fn: fn.LD_Vx_I },           /* LD Vx, [I] */

    /*
    ** --------------------------------
    **          Super Chip-48:
    ** --------------------------------
    */
	{ id: 0x00C0, mask: 0xFFF0, fn: null },                 /* SCD nibble */
	{ id: 0x00FB, mask: 0xFFFF, fn: null },                 /* SCR */
	{ id: 0x00FC, mask: 0xFFFF, fn: null },                 /* SCL */
	{ id: 0x00FD, mask: 0xFFFF, fn: null },                 /* EXIT */
	{ id: 0x00FE, mask: 0xFFFF, fn: null },                 /* LOW */
	{ id: 0x00FF, mask: 0xFFFF, fn: null },                 /* HIGH */
	{ id: 0xD000, mask: 0xF00F, fn: null },                 /* DRW Vx, Vy, 0 */
	{ id: 0xF030, mask: 0xF0FF, fn: null },                 /* LD HF, Vx */
	{ id: 0xF075, mask: 0xF0FF, fn: null },                 /* LD R, Vx */
	{ id: 0xF085, mask: 0xF0FF, fn: null }                  /* LD Vx, R */
];

export default opcodes;
