import { Actor, ActorArgs, Engine, Keys, Timer, Vector } from "excalibur";
import { Resource } from "../Resource";
import { PlayerBullet } from "./PlayerBullet";
import { updateHealthBar } from "../../ui/healtbar";
import { BaseLevel } from "../Scenes/LevelFactory";

export class Player extends Actor {
  public health: number = 3;
  public level: BaseLevel | null = null;
  private _hasShot: boolean = false;
  public invincible: boolean = false;
  public move: "Left" | "Right" | false = false;
  public shootTimer: Timer = new Timer({
    fcn: () => {
      this._hasShot = false;
      this.shootTimer.reset();
    },
    interval: 1000,
  });
  public respawnTimer: Timer = new Timer({
    fcn: () => {
      this.invincible = false;
      console.log(this.invincible);
      this.shootTimer.reset();
    },
    interval: 3000,
  });
  constructor(props: ActorArgs) {
    super({ ...props });
  }
  override onInitialize(_engine: Engine): void {
    this.addTag("player");
    this.graphics.use(Resource.player.toSprite());
  }
  setLevel(scene: BaseLevel) {
    this.level = scene;
  }
  getTimers() {
    return [this.shootTimer, this.respawnTimer];
  }
  shoot() {
    if (!this._hasShot) {
      this._hasShot = true;
      this.scene?.engine.add(
        new PlayerBullet({
          pos: this.pos.clone().add(new Vector(0, -this.height / 2)),
        }),
      );
      this.shootTimer.start();
    }
  }
  override onPreUpdate(engine: Engine, _elapsed: number): void {
    if (engine.input.keyboard.isHeld(Keys.L)) {
      this.move = "Right";
    }
    if (engine.input.keyboard.isHeld(Keys.H)) {
      this.move = "Left";
    }
    if (
      this.pos.x + this.width / 2 > engine.drawWidth &&
      this.move !== "Left"
    ) {
      this.move = false;
    }
    if (this.pos.x - this.width / 2 < 0 && this.move !== "Right") {
      this.move = false;
    }
    if (
      engine.input.keyboard.wasReleased(Keys.L) ||
      engine.input.keyboard.wasReleased(Keys.H)
    ) {
      // without this it will stay moving
      this.move = false;
    }
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.shoot();
    }
    this.handleMove(this.move);
  }
  handleMove(move: "Right" | "Left" | false) {
    if (move === false) {
      this.vel.x = 0;
      return;
    }
    if (move === "Left") {
      this.vel.x = -64;
      return;
    }
    if (move === "Right") {
      this.vel.x = 64;
      return;
    }
  }
  hit() {
    if (this.invincible) return;
    this.health--;
    updateHealthBar(this.health);
    if (this.health === 0) {
      this.move = false;
      this.level?.gameOver();
      return;
    }
    this.invincible = true;
    this.actions
      .blink(200, 200, 5)
      .delay(1000)
      .callMethod(() => {
        this.invincible = false;
      });
  }
}

export const player = new Player({
  width: 16,
  height: 16,
});
