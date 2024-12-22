import { player } from "./game/Actors/Player";
import { loader } from "./game/Resource";
import { Level1 } from "./game/Scenes/Level1";
import { Level2 } from "./game/Scenes/Level2";
import { createLevel } from "./game/Scenes/LevelFactory";
import { BaseMenu } from "./game/Scenes/Menu";
import "./style.css";
import { Color, Engine, Resolution } from "excalibur";

const config = {
  scale: 3,
  resWidth: 320,
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

const lvl1 = createLevel(2, ["Gava", "Gava"], player);
const lvl2 = createLevel(2, ["Borg", "Gava"], player);
const mainMenu = new BaseMenu("Space War", "Press ENTER to play");
const gameOverMenu = new BaseMenu("Game Over", "Press ENTER to restart");
const winMenu = new BaseMenu("You Win", "Press ENTER to next level");
const finishMenu = new BaseMenu(
  "You've finished the game",
  "Press ENTER to restart",
);
game.add("level1", lvl1);
game.add("level2", lvl2);
game.add("mainMenu", mainMenu);
game.add("gameOverMenu", gameOverMenu);
game.add("winMenu", winMenu);
game.add("finishMenu", finishMenu);
game.goToScene("mainMenu");
game.start(loader);
