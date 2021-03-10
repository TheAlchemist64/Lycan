import { RNG } from "rot-js";

export function randInt(a: number, b: number): number {
    return a + Math.floor(RNG.getUniform() * (b-a+1));
}