import { Enemy } from "./game/Enemy";
import { Player } from "./game/Player";
import "./style.css";
import {
  Color,
  Engine,
  ImageSource,
  Loader,
  Resolution,
  Vector,
} from "excalibur";

const game = new Engine({
  viewport: { width: 800, height: 600 },
  resolution: Resolution.GameBoyAdvance,
  fixedUpdateFps: 60,
  pixelArt: true,
  antialiasing: false,
  backgroundColor: Color.Black,
});
const player = new Player({
  pos: new Vector(64, game.drawHeight - 8),
  width: 16,
  height: 16,
  color: Color.Red,
});
const enemy = new Enemy({
  pos: new Vector(64, 8),
  width: 16,
  height: 16,
  color: Color.Purple,
});
game.add(player);
game.add(enemy);
game.start();
