import { Actor, ActorArgs, Engine, Keys, Timer, Vector } from "excalibur";
import { Resource } from "../Resource";
import { PlayerBullet } from "./PlayerBullet";

export class Player extends Actor {
  public health: number = 3;
  private _hasShot: boolean = false;
  public shootTimer: Timer = new Timer({
    fcn: () => {
      this._hasShot = false;
      this.shootTimer.reset();
    },
    interval: 1000,
  });
  constructor(props: ActorArgs) {
    super({ ...props });
  }
  override onInitialize(_engine: Engine): void {
    this.addTag("player");
    this.graphics.use(Resource.player.toSprite());
  }
  override onPreUpdate(engine: Engine, _elapsed: number): void {
    if (engine.input.keyboard.isHeld(Keys.L)) {
      this.vel.x = 64;
      return;
    }
    if (engine.input.keyboard.isHeld(Keys.H)) {
      this.vel.x = -64;
      return;
    }
    if (engine.input.keyboard.wasPressed(Keys.Space) && !this._hasShot) {
      this._hasShot = true;
      engine.add(
        new PlayerBullet({
          pos: this.pos.clone().add(new Vector(0, -this.height / 2)),
        }),
      );
      this.shootTimer.start();
    }
    this.vel.x = 0;
  }
  hit() {
    this.health--;
    console.log("health", this.health);
    if (this.health === 0) {
      this.scene!.gameOver();
    }
  }
}

export const player = new Player({
  width: 16,
  height: 16,
});
