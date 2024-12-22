import { EventEmitter } from "excalibur";

type EnemyEvents = {
  reversedirection: {};
};
export const vent = new EventEmitter<EnemyEvents>();
