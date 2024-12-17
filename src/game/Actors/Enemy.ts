import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  CollisionGroup,
  CollisionGroupManager,
  CollisionType,
  Color,
  Engine,
  EventEmitter,
  Scene,
  Side,
  Subscription,
  Vector,
} from "excalibur";
import { Resource } from "../Resource";
import { PlayerBullet } from "./PlayerBullet";
import { EnemyBullet } from "./EnemyBullet";

/* TODO: might move the event emitter or change how pubsub work
 * this might not be the correct way to do it, but it works
 */
type EnemyEvents = {
  reversedirection: {};
};
const vent = new EventEmitter<EnemyEvents>();

export class Enemy extends Actor {
  private _accTime: number = 0;
  private _handler: Subscription | null = null;
  constructor(props: ActorArgs) {
    super(props);
  }
  override onInitialize() {
    this.graphics.use(Resource.Gava.toSprite());
    this._handler = vent.on("reversedirection", () => {
      console.log("wall");
      this.vel.x *= -1;
    });
  }
  override onPreUpdate(engine: Engine, elapsed: number): void {
    this._accTime += elapsed;
    if (this._accTime >= 5000) {
      // TODO: change this to use timer instead
      engine.add(
        new EnemyBullet({
          pos: this.pos.clone().add(new Vector(0, this.height / 2 + 2)),
          vel: new Vector(0, 32),
          width: 1,
          height: 4,
        }),
      );
      this._accTime = 0;
    }
    if (this.pos.x + this.width / 2 > engine.drawWidth) {
      vent.emit("reversedirection");
    }
    if (this.pos.x - this.width / 2 < 0) {
      vent.emit("reversedirection");
    }
  }
  override onCollisionStart(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact,
  ): void {
    if (other.owner instanceof PlayerBullet) {
      this.actions.blink(100, 100, 1).die();
    }
  }
  override onPreKill(scene: Scene): void {
    this._handler?.close();
  }
}
