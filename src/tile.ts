import { Display } from "rot-js";
import Actor from "./actor";
import Glyph from "./glyph";

export enum Torch {
    NONE,
    UNLIT,
    LIT
}

export class TileType {
    name: string;
    glyph: Glyph;
    blockSight: boolean;
    blockMove: boolean;
    noise: number;
    constructor(name: string, glyph: Glyph, blockSight: boolean, blockMove: boolean, noise: number = 1){
        this.name = name;
        this.glyph = glyph;
        this.blockSight = blockSight;
        this.blockMove = blockMove;
        this.noise = noise;
    }
}

export class Tile {
    x: number;
    y: number;
    type: TileType;
    torch: Torch;
    actor: Actor;
    constructor(x: number, y: number, type: TileType, torch?: Torch, actor?: Actor) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.torch = torch || Torch.NONE;
        this.actor = actor;
    }
    draw(display: Display, x?: number, y?: number, excludeActor?: boolean): void {
        if (x === undefined) {
            x = this.x;
        }
        if (y === undefined) {
            y = this.y;
        }
        if (this.actor && !excludeActor){
            this.actor.draw(display, x, y);
        }
        else{
            this.type.glyph.draw(display, x, y);
        }
    }
}

export const TileTypes = {
    'wall': new TileType('wall', new Glyph('#', 'white'), true, true),
    'floor': new TileType('floor', new Glyph('.', 'white'), false, false)
}