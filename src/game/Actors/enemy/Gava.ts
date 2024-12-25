import {
  Animation,
  AnimationStrategy,
  range,
  SpriteSheet,
  Vector,
} from "excalibur";
import { Resource } from "../../Resource";
import { EnemyBullet } from "../EnemyBullet";
import { EnemyBase } from "../EnemyBase";

const sheet = SpriteSheet.fromImageSource({
  image: Resource.gavaSheet,
  grid: {
    rows: 1,
    columns: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});
export class Gava extends EnemyBase {
  public anim = Animation.fromSpriteSheet(
    sheet,
    range(1, 4),
    100,
    AnimationStrategy.End,
  );

  override shoot(): void {
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(0, this.height / 2 + 2)),
        vel: new Vector(0, 32),
        width: 1,
        height: 4,
      }),
    );
  }
  override hit(): Animation | null {
    this.graphics.use(this.anim);
    this.anim.events.once("end", () => this.kill());
    return this.anim;
  }
}
