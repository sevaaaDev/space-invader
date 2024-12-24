import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  Engine,
  EventEmitter,
  Graphic,
  Random,
  Scene,
  Side,
  Sprite,
  Subscription,
  Timer,
  Vector,
} from "excalibur";
import { PlayerBullet } from "../PlayerBullet";
import { EnemyBullet } from "../EnemyBullet";
import { vent } from "./event";
import { EnemyBase } from "../EnemyBase";

const random = new Random(999);
export class SuperGava extends EnemyBase {
  public health: number = 2;
  override shoot(): void {
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(4, this.height / 2)),
        vel: new Vector(0, 32),
        width: 1,
        height: 4,
      }),
    );
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(-4, this.height / 2)),
        vel: new Vector(0, 32),
        width: 1,
        height: 4,
      }),
    );
  }
  override hit(): void {
    this.health--;
    this.actions.blink(100, 100, 1);
    if (this.health === 0) {
      this.scene!.checkWinning();
      this.actions.blink(100, 100, 1).die();
    }
  }
}
