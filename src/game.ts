import { Display } from "rot-js";
import Glyph from "./glyph";
import Actor from "./actor";
import GameMap from "./map";
import { randInt } from "./utils";
import Camera from "./camera";
import { generate } from "./mapgen";

const MAP_WIDTH = 200;
const MAP_HEIGHT = 200;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 35;

export default {
    display: Display,
    player: Actor,
    gameMap: GameMap,
    camera: Camera,
    init(): void {
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT });
        const canvas = this.display.getContainer();
        canvas.addEventListener('keydown', this);
        canvas.setAttribute('tabindex', "1");
        document.getElementById("game").appendChild(canvas);
        this.gameMap = generate(MAP_WIDTH, MAP_HEIGHT);
        let pt = this.gameMap.getTile(randInt(1, this.gameMap.width - 2),
        randInt(1, this.gameMap.height - 2));
        while (pt.type.name != 'floor') {
            let x = randInt(1, this.gameMap.width - 2);
            let y = randInt(1, this.gameMap.height - 2);
            pt = this.gameMap.getTile(x, y);
        } 
        this.player = new Actor('Player', pt.x, pt.y, new Glyph('@', 'lightgreen'));
        this.camera = new Camera(CAMERA_WIDTH, CAMERA_HEIGHT);
        this.camera.draw(this.player, this.gameMap, this.display);

        const focusReminder = document.getElementById('focus-reminder');
        canvas.addEventListener('blur', () => { focusReminder.style.visibility = 'visible'; });
        canvas.addEventListener('focus', () => { focusReminder.style.visibility = 'hidden'; });
        canvas.focus();
    },
    handleEvent(e) {
        e.preventDefault();
        switch(e.key) {
            case 'ArrowRight':
                this.player.move(this.gameMap, 1, 0);
                break;
            case 'ArrowLeft':
                this.player.move(this.gameMap, -1, 0);
                break;
            case 'ArrowDown':
                this.player.move(this.gameMap, 0, 1);
                break;
            case 'ArrowUp':
                this.player.move(this.gameMap, 0, -1);
                break;
        }
        this.display.clear();
        this.camera.draw(this.player, this.gameMap, this.display);
    }
}