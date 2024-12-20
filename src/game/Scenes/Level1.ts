import { Color, Engine, Scene, vec } from "excalibur";
import { player, Player } from "../Actors/Player";
import { Enemy } from "../Actors/Enemy";
import { createEnemyPack } from "../Utils/createEnemyPack";

export class Level1 extends Scene {
  constructor() {
    super();
  }
  override onInitialize(engine: Engine): void {
    console.log("hello");
    player.pos = vec(64, engine.drawHeight - 8);
    this.add(player);
    let enemies = createEnemyPack(2, ["Gava", "Gava"]);
    console.log(enemies);
    enemies.forEach((e) => this.add(e));
    console.log(this.entities);
  }
  override onPostUpdate(engine: Engine, elapsed: number): void {
    if (this.entities.filter((e) => e instanceof Player).length === 0) {
      // TODO: create game over menu
      engine.goToScene("menu");
      return;
    }
    if (this.entities.filter((e) => e instanceof Enemy).length === 0) {
      player.actions
        .moveTo(vec(engine.halfDrawWidth - 8, engine.drawHeight - 8), 94)
        .moveTo(vec(engine.halfDrawWidth - 8, 16), 128)
        .callMethod(() => {
          engine.goToScene("menu");
        });
    }
  }
}
