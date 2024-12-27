import { EventEmitter } from "excalibur";

type EnemyEvents = {
  reversedirection: {};
  movetofront: {};
};
export const vent = new EventEmitter<EnemyEvents>();
