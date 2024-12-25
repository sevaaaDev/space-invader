import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Side,
  vec,
  Vector,
} from "excalibur";
import { EnemyBullet } from "./EnemyBullet";
import { Gava } from "./enemy/Gava";
import { EnemyBase } from "./EnemyBase";
export class PlayerBullet extends Actor {
  constructor(props: { pos: Vector }) {
    super({
      ...props,
      width: 1,
      height: 4,
      color: Color.Green,
      collisionType: CollisionType.Passive,
      vel: vec(0, -128),
    });
  }
  override onInitialize(engine: Engine): void {
    this.once("exitviewport", () => {
      this.kill();
    });
  }
  override onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact,
  ): void {
    if (other.owner instanceof EnemyBullet) {
      this.kill();
    }
    if (other.owner instanceof EnemyBase) {
      this.kill();
    }
  }
}
