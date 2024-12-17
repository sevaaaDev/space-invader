import { Enemy } from "./game/Actors/Enemy";
import { Player } from "./game/Actors/Player";
import { loader } from "./game/Resource";
import { Level1 } from "./game/Scenes/Level1";
import "./style.css";
import {
  CollisionGroup,
  CollisionGroupManager,
  Color,
  Engine,
  ImageSource,
  Loader,
  Resolution,
  vec,
  Vector,
} from "excalibur";

// TODO: bullets

const game = new Engine({
  viewport: { width: 800, height: 600 },
  resolution: Resolution.GameBoyAdvance,
  fixedUpdateFps: 60,
  pixelArt: true,
  antialiasing: false,
  backgroundColor: Color.Black,
});
const enemy = new Enemy({
  pos: new Vector(64, 8),
  width: 16,
  height: 16,
  color: Color.Purple,
  vel: vec(32, 0),
});
const enemy2 = new Enemy({
  pos: new Vector(96, 8),
  width: 16,
  height: 16,
  color: Color.Purple,
  vel: vec(32, 0),
});
const lvl1 = new Level1();
game.add("level1", lvl1);
await game.start(loader);
game.goToScene("level1");
