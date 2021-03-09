import { Display, KEYS } from "rot-js";
import Glyph from "./glyph";
import Actor from "./actor";

const MAP_WIDTH = 200;
const MAP_HEIGHT = 200;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 35;

export default {
    display: Display,
    player: Actor,
    init(): void {
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT });
        const canvas = this.display.getContainer();
        canvas.addEventListener('keydown', this);
        canvas.setAttribute('tabindex', "1");
        document.getElementById("game").appendChild(canvas);
        this.player = new Actor('Player', 40, CAMERA_HEIGHT/2, new Glyph('@', 'white'));
        this.player.draw(this.display);

        const focusReminder = document.getElementById('focus-reminder');
        canvas.addEventListener('blur', () => { focusReminder.style.visibility = 'visible'; });
        canvas.addEventListener('focus', () => { focusReminder.style.visibility = 'hidden'; });
        canvas.focus();
    },
    handleEvent(event) {
        event.preventDefault();
        if (event.keyCode === KEYS.VK_RIGHT) { this.player.x++; }
        if (event.keyCode === KEYS.VK_LEFT)  { this.player.x--; }
        if (event.keyCode === KEYS.VK_DOWN)  { this.player.y++; }
        if (event.keyCode === KEYS.VK_UP)    { this.player.y--; }
        this.display.clear();
        this.player.draw(this.display);
    }
}