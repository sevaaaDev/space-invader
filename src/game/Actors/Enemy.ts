import {
  Actor,
  ActorArgs,
  Collider,
  CollisionContact,
  Engine,
  EventEmitter,
  Graphic,
  Scene,
  Side,
  Sprite,
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
  private _sprite: Graphic | undefined;
  constructor(props: ActorArgs & { sprite?: Graphic }) {
    super(props);
    this._sprite = props.sprite;
  }
  override onInitialize() {
    if (this._sprite) {
      this.graphics.use(this._sprite);
    }
    this._handler = vent.on("reversedirection", (e) => {
      this.vel.x = e.velX;
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
      vent.emit("reversedirection", { velX: -32 });
    }
    if (this.pos.x - this.width / 2 < 0) {
      vent.emit("reversedirection", { velX: 32 });
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
  override onPreKill(_scene: Scene): void {
    this._handler?.close();
  }
}
