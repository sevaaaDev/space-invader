import { loader } from "./game/Resource";
import { Level1 } from "./game/Scenes/Level1";
import "./style.css";
import { Color, Engine, Resolution } from "excalibur";

// TODO: bullets

const game = new Engine({
  viewport: { width: 800, height: 600 },
  resolution: Resolution.GameBoyAdvance,
  maxFps: 60,
  fixedUpdateFps: 60,
  pixelArt: true,
  antialiasing: false,
  backgroundColor: Color.Black,
});
const lvl1 = new Level1();
game.add("level1", lvl1);
game.goToScene("level1");
game.start(loader);
