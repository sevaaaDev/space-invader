import { Engine, Scene, SceneActivationContext, Timer } from "excalibur";
import { gameState } from "../State";

const ui: HTMLDivElement | null = document.querySelector(".ui");
export class Menu extends Scene {
  countdownTimer: Timer = new Timer({
    fcn: () => {
      console.log("h");
      if (this.count === 0) {
        this.count = 2;
        gameState.setState("currentLevel", 2);
        this.engine.goToScene(`level${gameState.state.currentLevel}`);
        return;
      }
      this.countdownElement.innerText = `${this.count--}`;
    },
    numberOfRepeats: 3,
    interval: 1000,
    repeats: true,
  });
  count: number = 2;
  countdownElement: HTMLParagraphElement = document.createElement("p");
  override onInitialize(engine: Engine): void {
    this.add(this.countdownTimer);
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    const text = document.createElement("p");
    text.innerText = "Next Wave";
    this.countdownElement.innerText = "3";
    ui?.appendChild(text);
    ui?.appendChild(this.countdownElement);
    this.countdownTimer.reset();
    this.countdownTimer.start();
  }
  override onDeactivate(context: SceneActivationContext): void {
    if (ui === null) {
      throw "Ui is null, maybe u forgot to add the element";
    }
    ui.innerHTML = "";
  }
}
