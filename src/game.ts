import { Display, RNG } from "rot-js";
import Glyph from "./glyph";
import Actor from "./actor";
import GameMap from "./map";
import { randInt } from "./utils";
import Camera from "./camera";
import { generate } from "./mapgen";
import Log from "./msglog";
import Store, { GameData } from "./store";

const MAP_WIDTH = 100;
const MAP_HEIGHT = 45;
const CAMERA_WIDTH = 80;
const CAMERA_HEIGHT = 30;
const LOG_LENGTH = 5;

export default {
    display: Display,
    player: Actor,
    saveName: String,
    mapRNG: Array,
    gameMap: GameMap,
    camera: Camera,
    messages: Array,
    init(): void {
        this.messages = [];
        this.display = new Display({ width: CAMERA_WIDTH, height: CAMERA_HEIGHT + LOG_LENGTH });
        this.camera = new Camera(CAMERA_WIDTH, CAMERA_HEIGHT);
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
        let pt = this.gameMap.placeActor();
        this.player = new Actor('Player', pt.x, pt.y, new Glyph('@', 'lightgreen'));
        let mt = this.gameMap.placeActor();
        this.monster = new Actor('Rat', mt.x, mt.y, new Glyph('r', 'lightbrown'));
        this.gameMap.setTile(mt.x, mt.y, this.monster);
        console.log(mt);
        this.camera.draw(this.player, this.gameMap, this.display);
        this.refocus();
    },
    saveGame(): void {
        const data: GameData = {
            rng: this.mapRNG,
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            player: this.player,
            monster: this.monster,
            messages: Log.all()
        }
        Store.save(`${this.saveName}`, data);
    },
    loadGame(): void {
        const data: GameData = Store.load(`${this.saveName}`);
        RNG.setState(data.rng);
        this.gameMap = generate(data.width, data.height);
        let glyph = new Glyph(data.player.glyph.ch, data.player.glyph.fg, data.player.glyph.bg);
        this.player = new Actor(data.player.name, data.player.x, data.player.y, glyph);
        this.gameMap.setTile(this.player.x, this.player.y, this.player);
        let mGlyph = new Glyph(data.monster.glyph.ch, data.monster.glyph.fg, data.monster.glyph.bg);
        this.monster = new Actor(data.monster.name, data.monster.x, data.monster.y, mGlyph);
        this.gameMap.setTile(this.monster.x, this.monster.y, this.monster);
        this.mapRNG = data.rng;
        Log.load(data.messages);
        this.camera.draw(this.player, this.gameMap, this.display);
        this.refocus();
    }
}