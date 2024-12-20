import { loader } from "./game/Resource";
import { Level1 } from "./game/Scenes/Level1";
import { Level2 } from "./game/Scenes/Level2";
import { Menu } from "./game/Scenes/Menu";
import "./style.css";
import { Color, Engine, Resolution } from "excalibur";

// TODO: bullets
// add levels

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

const lvl1 = new Level1();
const lvl2 = new Level2();
const menu = new Menu();
game.add("level1", lvl1);
game.add("level2", lvl2);
game.add("menu", menu);
game.goToScene("menu");
game.start(loader);
