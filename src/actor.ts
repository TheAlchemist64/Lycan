import { Display } from "rot-js";
import Glyph from "./glyph";
import GameMap from "./mapgen";

export default class Actor {
    name: string;
    x: number;
    y: number;
    glyph: Glyph;
    constructor(name: string, x: number, y: number, glyph: Glyph) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.glyph = glyph;
    }
    move(gameMap: GameMap, dx: number, dy: number): void {
        let nx = this.x + dx;
        let ny = this.y + dy;
        let tile = gameMap.getTile(nx, ny);
        if (tile.type.name == 'wall') {
            return;
        }
        this.x = nx;
        this.y = ny;
    }
    draw(display: Display): void {
        this.glyph.draw(display, this.x, this.y);
    }
}