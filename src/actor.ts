import { Display } from "rot-js";
import Glyph from "./glyph";

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
    draw(display: Display): void {
        this.glyph.draw(display, this.x, this.y);
    }
}