import { Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { EnemyType } from "../Actors/EnemyFactory";
import { Player } from "../Actors/Player";
import { createEnemyPack } from "../Utils/createEnemyPack";
import { Gava } from "../Actors/enemy/Gava";
import { gameState } from "../State";
import { updateHealthBar } from "../../ui/healtbar";
import { updateLevelUI } from "../../ui/levelUi";
import { EnemyBullet } from "../Actors/EnemyBullet";
import { PlayerBullet } from "../Actors/PlayerBullet";

class BaseLevel extends Scene {
  constructor(
    private _packRows: number,
    private _packCols: number,
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
    updateLevelUI(gameState.state.currentLevel);
    this._player.pos = vec(64, this.engine.drawHeight - 8);
    this._player.actions.clearActions();
    if (this._player.health === 0) {
      this._player.health = 3;
      updateHealthBar(this._player.health);
    }
    this.add(this._player);
    this.add(this._player.shootTimer);
    let enemies = createEnemyPack(
      this._packRows,
      this._packCols,
      this._template,
    );
    enemies.forEach((e) => this.add(e));
  }
  gameOver() {
    this.engine.goToScene("gameOverMenu");
  }
  checkWinning() {
    if (
      this.entities.filter(
        (e) =>
          !(e instanceof Player) &&
          !(e instanceof EnemyBullet) &&
          !(e instanceof PlayerBullet),
      ).length === 1
    ) {
      gameState.setState((s: any) => s.currentLevel++);
      this._player.actions
        .moveTo(
          vec(this.engine.halfDrawWidth - 8, this.engine.drawHeight - 8),
          94,
        )
        .moveTo(vec(this.engine.halfDrawWidth - 8, 16), 128)
        .callMethod(() => {
          if (gameState.state.currentLevel === 11) {
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
  column: number,
  template: EnemyType[],
  player: Player,
) {
  return new BaseLevel(rows, column, template, player);
}
