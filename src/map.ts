import { Display, } from "rot-js";
import Actor from "./actor";
import { TileType, Torch, Tile } from "./tile";
import { randInt } from "./utils";

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
    hasTile(x: number, y: number): boolean {
        return this.tiles.has(GameMap.key(x, y));
    }
    getTile(x: number, y: number): Tile {
        return this.tiles.get(GameMap.key(x, y));
    }
    setTile(x: number, y: number, actor?: Actor);
    setTile(x: number, y: number, actor?: Actor, type?: TileType);
    setTile(x: number, y: number, actor?: Actor, type?: TileType, torch?: Torch) {
        if (type !== undefined && torch !== undefined) {
            this.tiles.set(GameMap.key(x, y), new Tile(x, y, type, torch, actor));
        }
        else if (type !== undefined) {
            this.tiles.set(GameMap.key(x, y), new Tile(x, y, type, Torch.NONE, actor));
        }
        else{
            this.getTile(x, y).actor = actor;
        }
    }
    placeActor(): Tile {
        let tile: Tile = this.getTile(randInt(1, this.width - 2),
        randInt(1, this.height - 2));
        while (tile.type.name != 'floor' || tile.actor != null) {
            let x = randInt(1, this.width - 2);
            let y = randInt(1, this.height - 2);
            tile = this.getTile(x, y);
        }
        return tile;
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