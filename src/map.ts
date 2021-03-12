import { Display, } from "rot-js";
import Actor from "./actor";
import { TileType, Torch, Tile } from "./tile";

export default class GameMap {
    width: number;
    height: number;
    tiles: Map<string, Tile>;
    constructor(width?: number, height?: number, tiles?: Map<string, Tile>) {
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        this.tiles = tiles || new Map();
    }
    static key(x: number, y: number): string {
        return `${x},${y}`;
    }
    inBounds(x: number, y: number, padding: number = 0): boolean {
        return x > padding - 1 && x < this.width - padding && y > padding - 1 && y < this.height - padding;
    }
    getTile(x: number, y: number): Tile {
        return this.tiles.get(GameMap.key(x, y));
    }
    setTile(x: number, y: number, type?: TileType, torch?: Torch, actor?: Actor) {
        this.tiles.set(GameMap.key(x, y), new Tile(x, y, type, torch, actor));
    }
    draw(display: Display, x: number, y: number, w: number, h: number){
        for(let i = 0; i < w; i++){
            for(let j = 0; j < h; j++){
                if (!this.inBounds(x + i, y + j)) {
                    display.draw(i, j, '#', 'white', null);
                }
                else {
                    this.getTile(x + i, y + j).draw(display, i, j);
                }
            }
        }
    }
}