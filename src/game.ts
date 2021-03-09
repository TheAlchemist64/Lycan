import { Display } from "rot-js";

const MAP_WIDTH = 200;
const MAP_HEIGHT = 200;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 40;

export default {
    display: Display,
    init(): void {
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT });
        document.getElementById("game").appendChild(this.display.getContainer());
        this.display.draw(40, 20, '@', 'white', null);
    }
}