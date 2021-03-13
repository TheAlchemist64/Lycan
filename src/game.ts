import { Display, RNG } from "rot-js";
import Glyph from "./glyph";
import Actor from "./actor";
import GameMap from "./map";
import { randInt } from "./utils";
import Camera from "./camera";
import { generate } from "./mapgen";
import Store, { GameData } from "./store";

const MAP_WIDTH = 200;
const MAP_HEIGHT = 200;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 35;

export default {
    display: Display,
    player: Actor,
    saveName: String,
    mapRNG: Array,
    gameMap: GameMap,
    camera: Camera,
    init(): void {
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT });
        const canvas = this.display.getContainer();
        canvas.addEventListener('keydown', this);
        canvas.setAttribute('tabindex', "1");
        document.getElementById("game").appendChild(canvas);

        const focusReminder = document.getElementById('focus-reminder');
        canvas.addEventListener('blur', () => { focusReminder.style.visibility = 'visible'; });
        canvas.addEventListener('focus', () => { focusReminder.style.visibility = 'hidden'; });
        canvas.focus();

        this.saveName = "game-save";
        
        if (!localStorage.getItem(this.saveName)){
            this.newGame();
            this.saveGame();
        }
        else {
            this.loadGame();
        }
    },
    refocus(): void {
        this.display.getContainer().focus();
    },
    handleEvent(e) {
        e.preventDefault();
        let moved: boolean;
        switch(e.key) {
            case 'ArrowRight':
                moved = this.player.move(this.gameMap, 1, 0);
                break;
            case 'ArrowLeft':
                moved = this.player.move(this.gameMap, -1, 0);
                break;
            case 'ArrowDown':
                moved = this.player.move(this.gameMap, 0, 1);
                break;
            case 'ArrowUp':
                moved = this.player.move(this.gameMap, 0, -1);
                break;
        }
        if (moved){
            this.display.clear();
            this.camera.draw(this.player, this.gameMap, this.display);
        }
    },
    newGame() {
        RNG.setSeed((Date.now())+Math.random());
        this.mapRNG = RNG.getState();
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
        this.refocus();
    },
    saveGame(): void {
        const data: GameData = {
            rng: this.mapRNG,
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            player: this.player
        }
        Store.save(`${this.saveName}`, data);
    },
    loadGame(): void {
        const data: GameData = Store.load(`${this.saveName}`);
        RNG.setState(data.rng);
        this.gameMap = generate(data.width, data.height);
        let glyph = new Glyph(data.player.glyph.ch, data.player.glyph.fg, data.player.glyph.bg);
        this.player = new Actor(data.player.name, data.player.x, data.player.y, glyph);
        this.mapRNG = data.rng;
        this.camera = new Camera(CAMERA_WIDTH, CAMERA_HEIGHT);
        this.camera.draw(this.player, this.gameMap, this.display);
        this.refocus();
    }
}