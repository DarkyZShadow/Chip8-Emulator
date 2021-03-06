import CPU from './cpu';
import { Screen } from './render';

const options = {
    width: 64,
    height: 32,
    scale: 100,
    canvasWidth: 640,
    canvasHeight: 320,
    color: 'white',
    backgroundColor: 'black'
};
const app:HTMLElement = document.getElementById('game-wrapper');
const loadInput:HTMLElement = document.getElementById('load-input');
const startButton:HTMLElement = document.getElementById('start-button');
const suspendButton:HTMLElement = document.getElementById('suspend-button');
const screen:Screen = new Screen(options);
const chip8:CPU = new CPU(screen, 250);

loadInput.addEventListener('change', loadRom);
startButton.addEventListener('click', start);
suspendButton.addEventListener('click', suspend);

/* Bind manager */
screen.bind(app);

function loadRom(): void
{
    const fr:FileReader = new FileReader();

    fr.onload = (event: any) => chip8.loadRom(event.target.result);
    fr.readAsArrayBuffer(this.files[0]);
}

function start(): void
{
    chip8.run();
}

function suspend(): void
{
    chip8.suspend();
}
