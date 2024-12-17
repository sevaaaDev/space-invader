import { Color, Engine, Scene, vec } from "excalibur";
import { Player } from "../Actors/Player";
import { Enemy } from "../Actors/Enemy";

export class Level1 extends Scene {
  constructor() {
    super();
  }
  override onInitialize(engine: Engine): void {
    console.log("hello");
    const player = new Player({
      pos: vec(64, engine.drawHeight - 8),
      width: 16,
      height: 16,
      color: Color.Red,
    });
    this.add(player);
    let enemies = getEnemies();
    enemies.forEach((e) => this.add(e));
  }
}

function getEnemies() {
  let enemies: Enemy[] = [];
  for (let i = 8; i < 16 * 8; i += 16) {
    enemies.push(
      new Enemy({
        pos: vec(i, 16),
        width: 16,
        height: 16,
        vel: vec(32, 0),
      }),
    );
  }
  return enemies;
}
