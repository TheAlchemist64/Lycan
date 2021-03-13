import MapGen from "rot-js/lib/map/index";
import GameMap from "./map";
import { TileTypes, Torch } from "./tile";

export function generate(width: number, height: number): GameMap {

    let result = new GameMap(width, height);

    //Initialize all map cells to Wall
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            result.setTile(x, y, null, TileTypes.wall);
        }
    }

    let digger = new MapGen.Cellular(width, height);
    digger.randomize(0.5);
    let cb = (x, y, value) => {
        result.setTile(x, y, null, value ? TileTypes.wall : TileTypes.floor);
    }
    for(let i = 0; i < 2; i++){
        digger.create(cb);
    }
    digger.connect(cb, 0);

    return result;
}