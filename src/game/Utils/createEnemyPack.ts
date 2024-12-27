import { Actor, vec } from "excalibur";
import { Gava } from "../Actors/enemy/Gava";
import { EnemyFactory } from "../Actors/EnemyFactory";

export function createEnemyPack(
  rows: number,
  cols: number,
  type: any[],
  vel: any[],
  isHardMode: boolean,
) {
  let enemies: Actor[] = [];
  let currentRow: number = 0;
  for (let j = 32; j < 32 + 16 * rows; j += 16) {
    for (let i = 8; i < 24 * cols; i += 24) {
      enemies.push(
        EnemyFactory(type[currentRow], vec(i, j), vel[currentRow], isHardMode),
      );
    }
    currentRow++;
  }
  return enemies;
}
