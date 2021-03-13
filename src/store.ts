
import Actor from "./actor";
import GameMap from "./map";
import { generate } from "./mapgen";

export interface GameData {
    rng: number[];
    width: number;
    height: number;
    player: Actor;
    monster: Actor;
}

export default {
    save(name: string, data: GameData) {
        localStorage.setItem(`${name}`, JSON.stringify(data));
    },
    load(name: string): GameData {
        return JSON.parse(localStorage.getItem(`${name}`));
    }
}