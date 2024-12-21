import { Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { EnemyType } from "../Actors/EnemyFactory";
import { Player } from "../Actors/Player";
import { createEnemyPack } from "../Utils/createEnemyPack";
import { Enemy } from "../Actors/Enemy";

class Level extends Scene {
  constructor(
    private _packRows: number,
    private _template: EnemyType[],
    private _player: Player,
  ) {
    super();
  }
  override onPostUpdate(engine: Engine, elapsed: number): void {
    if (this.entities.filter((e) => e instanceof Player).length === 0) {
      // TODO: create game over menu
      engine.goToScene("menu");
      return;
    }
    if (this.entities.filter((e) => e instanceof Enemy).length === 0) {
      this._player.actions
        .moveTo(vec(engine.halfDrawWidth - 8, engine.drawHeight - 8), 94)
        .moveTo(vec(engine.halfDrawWidth - 8, 16), 128)
        .callMethod(() => {
          engine.goToScene("menu");
        });
    }
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    this.resetAndLoad();
  }
  resetAndLoad() {
    this.clear();
    this._player.pos = vec(64, this.engine.drawHeight - 8);
    this._player.actions.clearActions();
    this.add(this._player);
    this.add(this._player.shootTimer);
    let enemies = createEnemyPack(this._packRows, this._template);
    enemies.forEach((e) => this.add(e));
  }
}

export function createLevel(
  rows: number,
  template: EnemyType[],
  player: Player,
) {
  return new Level(rows, template, player);
}
