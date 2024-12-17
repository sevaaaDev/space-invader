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
    if (other.owner) {
      this.kill();
    }
    if (other.owner.tags.has("player")) {
      other.owner.kill();
      this.kill();
    }
  }
}
