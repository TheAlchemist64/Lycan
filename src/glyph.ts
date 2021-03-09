import { Display } from "rot-js";

export default class Glyph {
    ch: string;
    fg: string;
    bg: string;
    constructor(ch: string, fg: string, bg: string = null) {
        this.ch = ch;
        this.fg = fg;
        this.bg = bg;
    }
    draw(display: Display, x: number, y: number): void {
        display.draw(x, y, this.ch, this.fg, this.bg);
    }
}