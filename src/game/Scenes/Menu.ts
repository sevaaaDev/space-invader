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
  private _playHandle: (e: EventListenerObject) => void = (e) => {
    this.engine.goToScene("level" + gameState.state.currentLevel);
  };
  constructor(
    private _title: string,
    private _text: string,
  ) {
    super();
  }
  override onInitialize(engine: Engine): void {
    this.engine = engine;
  }
  initDOMListener() {
    const mainBtn: HTMLButtonElement | null = document.querySelector(".main");
    mainBtn?.addEventListener(
      "click",
      () => {
        this.engine.goToScene("level" + gameState.state.currentLevel);
      },
      { once: true },
    );
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    if (ui === null) {
      throw "Ui is null, maybe u forgot to add the element";
    }
    ui.innerHTML = "";
    this.initDOMListener();
    const title = document.createElement("h1");
    title.innerText = this._title;
    const text = document.createElement("p");
    text.innerText = this._text;
    const handle = this.input.keyboard.on("press", (e: KeyEvent) => {
      if (e.key === "Enter") {
        handle.close();
        this.engine.goToScene("level" + gameState.state.currentLevel);
      }
    });
    ui?.appendChild(title);
    ui?.appendChild(text);
  }
  override onDeactivate(context: SceneActivationContext): void {
    if (ui === null) {
      throw "Ui is null, maybe u forgot to add the element";
    }
    ui.innerHTML = "";
  }
}
