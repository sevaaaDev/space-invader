import { Scene, SceneActivationContext, vec } from "excalibur";
import { EnemyType } from "../Actors/EnemyFactory";
import { Player } from "../Actors/Player";
import { createEnemyPack } from "../Utils/createEnemyPack";
import { gameState } from "../State";
import { updateHealthBar } from "../../ui/healtbar";
import { updateLevelUI } from "../../ui/levelUi";
import { EnemyBullet } from "../Actors/EnemyBullet";
import { PlayerBullet } from "../Actors/PlayerBullet";

export class BaseLevel extends Scene {
  private _playerLeft = (e: Event) => {
    e.preventDefault();
    this._player.move = "Left";
  };
  private _playerRight = (e: Event) => {
    e.preventDefault();
    this._player.move = "Right";
  };
  private _playerStay = () => (this._player.move = false);
  constructor(
    private _packRows: number,
    private _packCols: number,
    private _template: EnemyType[],
    private _velTemplate: number[],
    private _player: Player,
    private _isHardMode: boolean = false,
  ) {
    super();
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    this.resetAndLoad();
    this.initDOMListener();
  }
  override onDeactivate(context: SceneActivationContext): void {
    this.removeDOMListener();
  }
  removeDOMListener() {
    const leftBtn: HTMLButtonElement | null = document.querySelector(".left");
    const rightBtn: HTMLButtonElement | null = document.querySelector(".right");
    leftBtn!.onpointerdown = null;
    rightBtn!.onpointerdown = null;
    leftBtn!.onpointerleave = null;
    rightBtn!.onpointerleave = null;
  }

  initDOMListener() {
    const leftBtn: HTMLButtonElement | null = document.querySelector(".left");
    const rightBtn: HTMLButtonElement | null = document.querySelector(".right");
    const mainBtn: HTMLButtonElement | null = document.querySelector(".main");
    leftBtn!.onpointerdown = this._playerLeft;
    rightBtn!.onpointerdown = this._playerRight;
    mainBtn!.onclick = () => this._player.shoot();
    leftBtn!.onpointerleave = this._playerStay;
    rightBtn!.onpointerleave = this._playerStay;
  }
  resetAndLoad() {
    this.clear();
    updateLevelUI(gameState.state.currentLevel);
    this._player.pos = vec(
      this.engine.halfDrawWidth,
      this.engine.drawHeight - 8,
    );
    this._player.actions.clearActions();
    this._player.setLevel(this);
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
      this._velTemplate,
      this._isHardMode,
    );
    enemies.forEach((e) => this.add(e));
  }
  gameOver() {
    gameState.setState((s: any) => (s.currentLevel = 1));
    this.engine.goToScene("gameOverMenu");
  }
  checkWinning() {
    if (
      this.entities.filter(
        (e) =>
          !(e instanceof Player) &&
          !(e instanceof EnemyBullet) &&
          !(e instanceof PlayerBullet),
      ).length <= 1
    ) {
      gameState.setState((s: any) => s.currentLevel++);
      this._player.actions
        .moveTo(
          vec(this.engine.halfDrawWidth - 8, this.engine.drawHeight - 8),
          128,
        )
        .moveTo(vec(this.engine.halfDrawWidth - 8, 16), 168)
        .callMethod(() => {
          if (gameState.state.currentLevel > 8) {
            gameState.setState((s: any) => (s.currentLevel = 1));
            this._player.health = 3;
            updateHealthBar(3);
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
  velTemplate: number[],
  player: Player,
  isHardMode: boolean = false,
) {
  return new BaseLevel(rows, column, template, velTemplate, player, isHardMode);
}
