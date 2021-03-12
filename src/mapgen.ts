import { Display, RNG } from "rot-js";
import MapGen from "rot-js/lib/map/index";
import Actor from "./actor";
import { TileType, Torch, Tile, TileTypes } from "./tile";
import { randInt } from "./utils";

export const MAP_WIDTH = 200;
export const MAP_HEIGHT = 200;

export default class GameMap {
    width: number = MAP_WIDTH;
    height: number = MAP_HEIGHT;
    percentFloor: number;
    tiles: Map<string, Tile>;
    constructor(width?: number, height?: number, percentFloor: number = 0.5, tiles?: Map<string, Tile>) {
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        this.percentFloor = percentFloor;
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
        /* if (!this.tiles.has(GameMap.key(x, y))) {
            //Tile doesn't exist
            if (typeof type === undefined) {
                throw new Error(`Tile at ${x}, ${y} needs a type (wall, floor, etc.)`);
            }
            let tile: Tile = null;
            if (type instanceof Tile) {
                tile = type;
            } 
            else{
                tile = new Tile(x, y, type, torch, actor);
            }
            this.tiles.set(`${x},${y}`, tile);
        } 
        else {
            //tile already exists
            let tile: Tile = this.getTile(x, y);
            if (type && type instanceof TileType) {
                tile.type = type;
            }
            if (torch) {
                tile.torch = torch;
            }
            if (actor) {
                tile.actor = actor;
            }
        } */
    }
    generate(): void {

        //Initialize all map cells to Wall
        for(let x = 0; x < this.width; x++){
            for(let y = 0; y < this.height; y++){
                this.setTile(x, y, TileTypes.wall, Torch.NONE);
            }
        }
        //pick random tile to start
        //let x = randInt(0, this.width);
        //let y = randInt(0, this.height);
        //start from center
        /* let x = Math.floor(this.width / 2);
        let y = Math.floor(this.height / 2);
        this.setTile(x, y, TileTypes.floor);

        const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        let floors = 0;
        let lastDir: number[] = null;
        while (floors / this.tiles.size < this.percentFloor) {
            let dirs = [...DIRS];
            if (lastDir) {
                dirs.push(lastDir);
            }
            dirs = dirs.filter(d => this.inBounds(x + d[0], y + d[1], 1));
            let dir = RNG.getItem(dirs);
            x += dir[0];
            y += dir[1];
            if (this.getTile(x, y).type.name == 'wall') {
                this.setTile(x, y, TileTypes.floor);
                floors++;
            }
            lastDir = dir;
        } */
        //let digger = new MapGen.Digger(this.width, this.height);
        let digger = new MapGen.Cellular(this.width, this.height);
        digger.randomize(0.5);
        let cb = (x, y, value) => {
            this.setTile(x, y, value ? TileTypes.wall : TileTypes.floor);
        }
        for(let i = 0; i < 2; i++){
            digger.create(cb);
        }
        digger.connect(cb, 0);
    }
    /* checkFree(x: number, y: number, dir: number[], length: number): boolean {
        let valid = true;
        for(let i = 1; i < length + 1; i++){
            let tile = this.getTile(x + dir[0] * i, y + dir[1] * i);
            if (tile.type.name == 'floor'){
                valid = false;
                break;
            }
        }
        return valid;
    } */
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