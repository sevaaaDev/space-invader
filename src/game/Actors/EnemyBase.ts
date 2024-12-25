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
  Subscription,
  Timer,
  Vector,
} from "excalibur";
import { PlayerBullet } from "./PlayerBullet";
import { vent } from "./enemy/event";

const random = new Random(999);
export class EnemyBase extends Actor {
  private _accTime: number = 0;
  private _handler: Subscription | null = null;
  private _sprite: Graphic | undefined;
  private _shootTimer: Timer = new Timer({
    fcn: () => {
      this.shoot();
    },
    interval: 3000,
    random,
    randomRange: [1000, 10000],
    repeats: true,
  });
  constructor(props: ActorArgs & { sprite?: Graphic }) {
    super(props);
    this._sprite = props.sprite;
  }
  shoot() {
    // override
  }
  hit() {
    // override
  }
  override onInitialize() {
    if (this._sprite) {
      this.graphics.use(this._sprite);
    }
    this._handler = vent.on("reversedirection", (e) => {
      if (Math.sign(this.vel.x) === e.sign) return;
      this.vel.x *= -1;
    });
    this.scene?.addTimer(this._shootTimer);
    this._shootTimer.start();
  }
  override onPreUpdate(engine: Engine, elapsed: number): void {
    if (this.pos.x + this.width / 2 > engine.drawWidth) {
      vent.emit("reversedirection", { sign: -1 });
    }
    if (this.pos.x - this.width / 2 < 0) {
      vent.emit("reversedirection", { sign: 1 });
    }
  }
  override onCollisionStart(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact,
  ): void {
    if (other.owner instanceof PlayerBullet) {
      this.hit();
      this.scene!.checkWinning();
    }
  }
  override onPreKill(_scene: Scene): void {
    this._handler?.close();
  }
}