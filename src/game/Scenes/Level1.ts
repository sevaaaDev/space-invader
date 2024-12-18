import { Color, Engine, Scene, vec } from "excalibur";
import { Player } from "../Actors/Player";
import { Enemy } from "../Actors/Enemy";

export class Level1 extends Scene {
  player: Player = new Player({
    width: 16,
    height: 16,
  });
  constructor() {
    super();
  }
  override onInitialize(engine: Engine): void {
    console.log("hello");
    this.player.pos = vec(64, engine.drawHeight - 8);
    this.add(this.player);
    let enemies = createEnemyPack(2);
    enemies.forEach((e) => this.add(e));
    console.log(this.entities);
  }
  override onPostUpdate(engine: Engine, elapsed: number): void {
    if (this.entities.filter((e) => e instanceof Enemy).length === 0) {
      this.player.actions
        .moveTo(vec(engine.halfDrawWidth - 8, engine.drawHeight - 8), 94)
        .moveTo(vec(engine.halfDrawWidth - 8, -8), 128)
        .callMethod(() => {
          engine.goToScene("menu");
        });
    }
  }
}

// TODO: customize enemy pack rows plane, [gava, borg, supergava]
function createEnemyPack(rows: number) {
  let enemies: Enemy[] = [];
  for (let j = 32; j < 32 + 16 * rows; j += 16) {
    for (let i = 8; i < 24 * 8; i += 24) {
      enemies.push(
        new Enemy({
          pos: vec(i, j),
          width: 16,
          height: 16,
          vel: vec(32, 0),
        }),
      );
    }
  }
  return enemies;
}
