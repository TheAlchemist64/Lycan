import { Display } from "rot-js";
import Actor from "./actor";
import GameMap from "./map";

export default class Camera {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    draw(actor: Actor, gameMap: GameMap, display: Display) {
        let half_width = Math.floor(this.width / 2);
        let half_height = Math.floor(this.height/ 2);
        let x = actor.x - half_width;
        let y = actor.y - half_height;
        gameMap.draw(display, x, y, this.width, this.height, ['Player']);
        actor.draw(display, half_width, half_height);
    }
}