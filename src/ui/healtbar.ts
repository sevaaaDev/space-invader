import imgPlayer from "/player.png";
export function updateHealthBar(health: number): void {
  const healthBarEl: HTMLDivElement | null = document.querySelector(".health");
  if (healthBarEl === null) throw "health bar not found";
  healthBarEl.innerHTML = "";
  for (let i = 0; i < health - 1; i++) {
    const img = document.createElement("img");
    img.src = imgPlayer;
    healthBarEl.appendChild(img);
  }
}
