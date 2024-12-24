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
export class Borg extends EnemyBase {
  override shoot() {
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(0, this.height / 2 + 2)),
        vel: new Vector(0, 32),
        width: 2,
        height: 4,
      }),
    );
  }
}
