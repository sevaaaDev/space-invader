import { player } from "./game/Actors/Player";
import { loader } from "./game/Resource";
import { createLevel } from "./game/Scenes/LevelFactory";
import { BaseMenu } from "./game/Scenes/Menu";
import "./style.css";
import { Color, Engine } from "excalibur";

const config = {
  scale: 2,
  resWidth: 340,
  resHeight: 224,
  get vw() {
    return this.resWidth * this.scale;
  },
  get vh() {
    return this.resHeight * this.scale;
  },
};

// TODO: change this to resizeobserver
if (window.innerWidth <= 960) {
  config.scale = 2;
}
if (window.innerWidth <= 640) {
  config.scale = 1;
}

const game = new Engine({
  viewport: { width: config.vw, height: config.vh },
  resolution: { width: config.resWidth, height: config.resHeight },
  maxFps: 60,
  fixedUpdateFps: 60,
  pixelArt: true,
  antialiasing: false,
  backgroundColor: Color.Black,
  canvasElementId: "canvas",
});

const lvl1 = createLevel(2, 5, ["Gava", "Gava"], [32, 32], player);
const lvl2 = createLevel(2, 6, ["Gava", "Gava"], [32, 32], player);
const lvl3 = createLevel(2, 6, ["Gava", "Gava"], [48, 48], player);
const lvl4 = createLevel(2, 6, ["Borg", "Gava"], [48, 48], player);
const lvl5 = createLevel(2, 7, ["Borg", "Gava"], [48, 48], player);
const lvl6 = createLevel(2, 8, ["Borg", "Gava"], [48, 48], player);
const lvl7 = createLevel(
  3,
  8,
  ["SuperGava", "Borg", "Gava"],
  [56, 56, 56],
  player,
);
const lvl8 = createLevel(
  3,
  8,
  ["SuperGava", "Borg", "Gava"],
  [64, 64, 64],
  player,
);
const lvl9 = createLevel(
  3,
  8,
  ["SuperGava", "Borg", "Gava"],
  [24, 24, 24],
  player,
  true,
);
const lvl10 = createLevel(
  3,
  8,
  ["SuperGava", "SuperGava", "Gava"],
  [16, 16, 16],
  player,
  true,
);
const mainMenu = new BaseMenu("Space War", "Press ENTER to play");
const gameOverMenu = new BaseMenu("Game Over", "Press ENTER to restart");
const winMenu = new BaseMenu("You Win", "Press ENTER to next level");
const finishMenu = new BaseMenu(
  "You've finished the game",
  "Press ENTER to restart",
);
game.add("level1", lvl1);
game.add("level2", lvl2);
game.add("level3", lvl3);
game.add("level4", lvl4);
game.add("level5", lvl5);
game.add("level6", lvl6);
game.add("level7", lvl7);
game.add("level8", lvl8);
game.add("level9", lvl9);
game.add("level10", lvl10);
game.add("mainMenu", mainMenu);
game.add("gameOverMenu", gameOverMenu);
game.add("winMenu", winMenu);
game.add("finishMenu", finishMenu);
game.goToScene("mainMenu");
game.start(loader);
