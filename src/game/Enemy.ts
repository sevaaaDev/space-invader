import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Side,
  Vector,
} from "excalibur";

export class Enemy extends Actor {
  private accTime: number = 0;
  constructor(props: ActorArgs) {
    super(props);
  }
  onPreUpdate(engine: Engine, elapsed: number): void {
    this.accTime += elapsed;
    if (this.accTime >= 5000) {
      console.log(engine.currentScene.actors);
      // engine.add(
      //   new Bullet({
      //     pos: this.pos.clone().add(new Vector(0, this.height / 2 + 2)),
      //     vel: new Vector(0, 32),
      //     width: 1,
      //     height: 4,
      //   }),
      // );
      this.accTime = 0;
    }
  }
}

class Bullet extends Actor {
  constructor(props: ActorArgs) {
    super({
      ...props,
      color: Color.Yellow,
      collisionType: CollisionType.Passive,
    });
  }
  onInitialize(engine: Engine): void {
    this.addTag("enemyBullet");
    this.once("exitviewport", () => {
      this.kill();
    });
  }
  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact,
  ): void {
    if (other.owner.tags.has("playerBullet")) {
      this.kill();
    }
    if (other.owner.tags.has("player")) {
      other.owner.kill();
      this.kill();
    }
  }
}
