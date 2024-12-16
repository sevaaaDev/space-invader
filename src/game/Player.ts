import {
  Actor,
  ActorArgs,
  CollisionType,
  Color,
  Engine,
  ImageSource,
  Keys,
  Vector,
} from "excalibur";
const sprite = new ImageSource("player.png");
export class Player extends Actor {
  constructor(props: ActorArgs) {
    super(props);
    // FIX: doing this would cause a red rectangle appear before img is loaded
    sprite.load().then(() => {
      this.graphics.use(sprite.toSprite());
    });
  }
  onInitialize(engine: Engine): void {
    this.addTag("player");
  }
  onPreUpdate(engine: Engine, elapsed: number): void {
    if (engine.input.keyboard.isHeld(Keys.L)) {
      this.vel = new Vector(64, 0);
      return;
    }
    if (engine.input.keyboard.isHeld(Keys.H)) {
      this.vel = new Vector(-64, 0);
      return;
    }
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      engine.add(
        new Bullet({
          pos: this.pos.clone().add(new Vector(0, -this.height / 2)),
          vel: new Vector(0, -32),
          height: 4,
          width: 1,
          color: Color.Green,
        }),
      );
    }
    this.vel = new Vector(0, 0);
  }
}

class Bullet extends Actor {
  constructor(props: ActorArgs) {
    super({ ...props, collisionType: CollisionType.Passive });
  }
  onInitialize(engine: Engine): void {
    this.addTag("playerBullet");
  }
}
