import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Side,
} from "excalibur";
import { Player } from "./Player";
import { PlayerBullet } from "./PlayerBullet";

export class EnemyBullet extends Actor {
  constructor(props: ActorArgs) {
    super({
      ...props,
      color: Color.Yellow,
      collisionType: CollisionType.Passive,
    });
  }
  override onInitialize(engine: Engine): void {
    this.addTag("enemyBullet");
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
    if (other.owner instanceof Player) {
      other.owner.hit();
      this.kill();
    }
    if (other.owner instanceof PlayerBullet) {
      this.kill();
    }
  }
}
