
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

/*
** CPU part
*/
import CPU from './cpu';
import { CanvasManager } from './render';

const options = {
    width: 64,
    height: 32,
    scale: 100,
    canvasWidth: 640,
    canvasHeight: 320,
    backgroundColor: 'white'
};
const app:HTMLElement = document.getElementById('app');
const loadInput:HTMLElement = document.getElementById('load-input');
const manager:CanvasManager = new CanvasManager(options);
const chip8:CPU = new CPU(manager, 250);

loadInput.addEventListener('change', loadRom);
/* Bind manager */
manager.bind(app);

/* Start */
chip8.run();

function loadRom(): void
{
    const fr:FileReader = new FileReader();

    fr.onload = (event: any) => chip8.loadRom(event.target.result);
    fr.readAsArrayBuffer(this.files[0]);
}
