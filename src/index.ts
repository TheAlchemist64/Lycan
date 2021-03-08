import { Display } from "rot-js";

let display: Display = new Display({ width: 80, height: 60 });
display.draw(40, 30, '@', 'white', null);
document.body.appendChild(display.getContainer());