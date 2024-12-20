import { vec, Vector } from "excalibur";
import { Enemy } from "./Enemy";
import { Resource } from "../Resource";

type EnemyType = "Gava" | "Borg" | "SuperGava";
export function EnemyFactory(type: EnemyType, pos: Vector): Enemy {
  if (type === "Gava") {
    return new Enemy({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(32, 0),
      sprite: Resource.gava.toSprite(),
    });
  }
  if (type === "Borg") {
    return new Enemy({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(32, 0),
      sprite: Resource.borg.toSprite(),
    });
  }
  if (type === "SuperGava") {
    return new Enemy({
      pos: pos,
      width: 16,
      height: 16,
      vel: vec(32, 0),
      sprite: Resource.superGava.toSprite(),
    });
  }
  throw "No enemy type given";
}
