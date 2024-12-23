import { Actor, vec, Vector } from "excalibur";
import { Gava } from "./enemy/Gava";
import { Resource } from "../Resource";
import { Borg } from "./enemy/Borg";
import { SuperGava } from "./enemy/SuperGava";

export type EnemyType = "Gava" | "Borg" | "SuperGava";
export function EnemyFactory(
  type: EnemyType,
  pos: Vector,
  velX: number = 32,
): Actor {
  if (type === "Gava") {
    return new Gava({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(velX, 0),
      sprite: Resource.gava.toSprite(),
    });
  }
  if (type === "Borg") {
    return new Borg({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(velX, 0),
      sprite: Resource.borg.toSprite(),
    });
  }
  if (type === "SuperGava") {
    return new SuperGava({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(velX, 0),
      sprite: Resource.superGava.toSprite(),
    });
  }
  throw "No enemy type given";
}
