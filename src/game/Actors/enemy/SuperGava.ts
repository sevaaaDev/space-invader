import {
  SpriteSheet,
  Vector,
  Animation,
  AnimationStrategy,
  range,
} from "excalibur";
import { EnemyBullet } from "../EnemyBullet";
import { EnemyBase } from "../EnemyBase";
import { Resource } from "../../Resource";

const sheet = SpriteSheet.fromImageSource({
  image: Resource.superGavaSheet,
  grid: {
    rows: 1,
    columns: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export class SuperGava extends EnemyBase {
  public anim = Animation.fromSpriteSheet(
    sheet,
    range(2, 4),
    100,
    AnimationStrategy.End,
  );
  public health: number = 2;
  private _totalGuns: number = 2;
  override shoot(): void {
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(4, this.height / 2)),
        vel: new Vector(0, 32),
        width: 1,
        height: 4,
      }),
    );
    if (this._totalGuns === 1) return;
    this.scene?.engine.add(
      new EnemyBullet({
        pos: this.pos.clone().add(new Vector(-4, this.height / 2)),
        vel: new Vector(0, 32),
        width: 1,
        height: 4,
      }),
    );
  }
  override hit(): Animation | null {
    this.health--;
    this.graphics.use(sheet.getSprite(1, 0));
    this._totalGuns = 1;
    if (this.health === 0) {
      this.graphics.use(this.anim);
      this.anim.events.once("end", () => this.kill());
      return this.anim;
    }
    return null;
  }
}
