import { Display } from "rot-js";

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
        canvas.focus();
        document.getElementById("game").appendChild(canvas);
        this.display.draw(40, CAMERA_HEIGHT/2, '@', 'white', null);

        const focusReminder = document.getElementById('focus-reminder');
        canvas.addEventListener('blur', () => { focusReminder.style.visibility = 'visible'; });
        canvas.addEventListener('focus', () => { focusReminder.style.visibility = 'hidden'; });
    },
    handleKeyDown(event) {
        console.log('keydown', event);
    }
}