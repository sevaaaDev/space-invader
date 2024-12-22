import { Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { EnemyType } from "../Actors/EnemyFactory";
import { Player } from "../Actors/Player";
import { createEnemyPack } from "../Utils/createEnemyPack";
import { Enemy } from "../Actors/Enemy";
import { gameState } from "../State";

class BaseLevel extends Scene {
  constructor(
    private _packRows: number,
    private _template: EnemyType[],
    private _player: Player,
  ) {
    super();
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    this.resetAndLoad();
  }
  resetAndLoad() {
    this.clear();
    this._player.pos = vec(64, this.engine.drawHeight - 8);
    this._player.actions.clearActions();
    if (this._player.health === 0) {
      this._player.health = 3;
    }
    this.add(this._player);
    this.add(this._player.shootTimer);
    let enemies = createEnemyPack(this._packRows, this._template);
    enemies.forEach((e) => this.add(e));
  }
  gameOver() {
    this.engine.goToScene("gameOverMenu");
  }
  checkWinning() {
    if (this.entities.filter((e) => e instanceof Enemy).length === 1) {
      gameState.setState((s: any) => s.currentLevel++);
      this._player.actions
        .moveTo(
          vec(this.engine.halfDrawWidth - 8, this.engine.drawHeight - 8),
          94,
        )
        .moveTo(vec(this.engine.halfDrawWidth - 8, 16), 128)
        .callMethod(() => {
          if (gameState.state.currentLevel === 2) {
            gameState.setState((s: any) => (s.currentLevel = 1));
            this.engine.goToScene("finishMenu");
            return;
          }
          this.engine.goToScene("winMenu");
        });
    }
  }
}

export function createLevel(
  rows: number,
  template: EnemyType[],
  player: Player,
) {
  return new BaseLevel(rows, template, player);
}
