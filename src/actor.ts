import { Display } from "rot-js";
import Glyph from "./glyph";
import GameMap from "./map";

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
    move(gameMap: GameMap, dx: number, dy: number): boolean {
        let nx = this.x + dx;
        let ny = this.y + dy;
        if (!gameMap.inBounds(nx, ny)) {
            return false;
        }
        let tile = gameMap.getTile(nx, ny);
        if (tile.type.name == 'wall') {
            return false;
        }

        gameMap.setTile(this.x, this.y, null);

        this.x = nx;
        this.y = ny;

        gameMap.setTile(nx, ny, this);

        return true;
    }
    draw(display: Display, x?: number, y?: number): void {
        if (x === undefined) {
            x = this.x;
        }
        if (y === undefined) {
            y = this.y;
        }
        this.glyph.draw(display, x, y);
    }
}