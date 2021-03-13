import { Display } from "rot-js";
import Actor from "./actor";
import GameMap from "./map";
import Log from "./msglog";

export default class Camera {
    width: number;
    height: number;
    messages: string[];
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.messages = [];
    }
    msg(text: string) {
        this.messages.push(text);
        if (this.messages.length > 5) {
            this.messages = this.messages.slice(1);
        }
    }
    draw(actor: Actor, gameMap: GameMap, display: Display) {
        let half_width = Math.floor(this.width / 2);
        let half_height = Math.floor(this.height/ 2);
        let x = actor.x - half_width;
        let y = actor.y - half_height;
        gameMap.draw(display, x, y, this.width, this.height, ['Player']);
        actor.draw(display, half_width, half_height);

        for(let i = 0; i < Log.size(); i++) {
            display.drawText(0, this.height + i, Log.get(i), this.width);
        }
    }
}