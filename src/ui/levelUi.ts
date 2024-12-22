export function updateLevelUI(level: number): void {
  const levelUi: HTMLParagraphElement | null =
    document.querySelector(".level-ui");
  if (levelUi === null) throw "level ui is not found";
  levelUi.innerText = "Level " + level;
}
