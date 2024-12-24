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
  SpriteSheet,
  Subscription,
  Timer,
  Vector,
  Animation,
  AnimationStrategy,
  range,
} from "excalibur";
import { PlayerBullet } from "../PlayerBullet";
import { EnemyBullet } from "../EnemyBullet";
import { vent } from "./event";
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

const random = new Random(999);
export class SuperGava extends EnemyBase {
  public anim = Animation.fromSpriteSheet(
    sheet,
    range(2, 4),
    100,
    AnimationStrategy.End,
  );
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
    this.graphics.use(sheet.getSprite(1, 0));
    if (this.health === 0) {
      this.graphics.use(this.anim);
      this.scene!.checkWinning();
      this.anim.events.once("end", () => {
        this.kill();
      });
    }
  }
}
