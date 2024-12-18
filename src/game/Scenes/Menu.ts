import { Engine, Scene, SceneActivationContext, Timer } from "excalibur";

const ui: HTMLDivElement | null = document.querySelector(".ui");
// FIX: doesnt countdown after second activation
export class Menu extends Scene {
  countdown: Timer = new Timer({
    fcn: () => {
      console.log("h");
      const count: HTMLParagraphElement | null =
        document.querySelector(".count");
      count!.innerText = `${this.count--}`;
    },
    numberOfRepeats: 3,
    interval: 1000,
    repeats: true,
  });
  count: number = 2;
  override onInitialize(engine: Engine): void {
    this.add(this.countdown);
  }
  override onActivate(context: SceneActivationContext<unknown>): void {
    const text = document.createElement("p");
    text.innerText = "Next Wave";
    const count = document.createElement("p");
    count.classList.add("count");
    count.innerText = "3";
    ui?.appendChild(text);
    ui?.appendChild(count);
    this.countdown.start();
    this.countdown.on(() => {
      if (this.count === -1) {
        this.engine.goToScene("level1");
      }
    });
  }
  override onDeactivate(context: SceneActivationContext): void {
    ui!.innerHTML = "";
  }
}
