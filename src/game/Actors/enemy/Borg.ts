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

const random = new Random(999);
const sheet = SpriteSheet.fromImageSource({
  image: Resource.borgSheet,
  grid: {
    rows: 1,
    columns: 4,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});
export class Borg extends EnemyBase {
  public anim = Animation.fromSpriteSheet(
    sheet,
    range(1, 4),
    100,
    AnimationStrategy.End,
  );
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
  override hit(): void {
    this.graphics.use(this.anim);
    this.anim.events.once("end", () => this.kill());
  }
}
