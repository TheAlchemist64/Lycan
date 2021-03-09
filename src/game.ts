import { Display } from "rot-js";
import Glyph from "./glyph";
import Actor from "./actor";

const MAP_WIDTH = 200;
const MAP_HEIGHT = 200;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 35;

export default {
    display: Display,
    init(): void {
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT });
        const canvas = this.display.getContainer();
        canvas.addEventListener('keydown', this.handleKeyDown);
        canvas.setAttribute('tabindex', "1");
        document.getElementById("game").appendChild(canvas);
        const player = new Actor('Player', 40, CAMERA_HEIGHT/2, new Glyph('@', 'white'));
        player.draw(this.display);

        const focusReminder = document.getElementById('focus-reminder');
        canvas.addEventListener('blur', () => { focusReminder.style.visibility = 'visible'; });
        canvas.addEventListener('focus', () => { focusReminder.style.visibility = 'hidden'; });
        canvas.focus();
    },
    handleKeyDown(event) {
        console.log('keydown', event);
    }
}