import { vec } from "excalibur";
import { Enemy } from "../Actors/Enemy";
import { EnemyFactory } from "../Actors/EnemyFactory";

export function createEnemyPack(rows: number, type: any[]) {
  let enemies: Enemy[] = [];
  let currentRow: number = 0;
  for (let j = 32; j < 32 + 16 * rows; j += 16) {
    for (let i = 8; i < 24 * 8; i += 24) {
      enemies.push(EnemyFactory(type[currentRow], vec(i, j)));
    }
    currentRow++;
  }
  return enemies;
}
