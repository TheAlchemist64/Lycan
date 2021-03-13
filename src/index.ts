import Game from "./game";

const focusReminder = document.getElementById('focus-reminder');

function setStorageButton(id: string, fn: () => void, text: string) {
    document.getElementById(id).addEventListener("mousedown", (e) => {
        focusReminder.innerHTML = text;
    })
    document.getElementById(id).addEventListener("click", (e) => {
        fn();
        focusReminder.innerHTML = 'Click Game to Resume Play';
    })
}

setStorageButton('save', Game.saveGame.bind(Game), 'Saving...');
setStorageButton('load', Game.loadGame.bind(Game), 'Loading...');
setStorageButton('reset', () => {
    Game.newGame();
    Game.saveGame();
}, 'Generating New Game...');

Game.init();