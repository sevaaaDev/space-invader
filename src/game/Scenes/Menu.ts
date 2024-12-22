import {
  Engine,
  KeyEvent,
  Scene,
  SceneActivationContext,
  Subscription,
  Timer,
} from "excalibur";
import { gameState } from "../State";

const ui: HTMLDivElement | null = document.querySelector(".ui");
export class BaseMenu extends Scene {
  private _playHandle!: Subscription;
  constructor(
    private _title: string,
    private _text: string,
  ) {
    super();
  }
  override onInitialize(engine: Engine): void {
    this.engine = engine;
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    const title = document.createElement("h1");
    title.innerText = this._title;
    const text = document.createElement("p");
    text.innerText = this._text;
    this._playHandle = this.input.keyboard.on("press", (e: KeyEvent) => {
      if (e.key === "Enter") {
        this.engine.goToScene("level" + gameState.state.currentLevel);
      }
    });
    ui?.appendChild(title);
    ui?.appendChild(text);
  }
  override onDeactivate(context: SceneActivationContext): void {
    this._playHandle.close();
    if (ui === null) {
      throw "Ui is null, maybe u forgot to add the element";
    }
    ui.innerHTML = "";
  }
}
