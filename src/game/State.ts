interface StateProps {
  [key: string]: any;
}
export class State {
  public state;
  constructor(state: StateProps) {
    this.state = state;
  }
  setState(stateNameOrCB: string | Function, newValue?: any) {
    if (typeof stateNameOrCB === "function") {
      stateNameOrCB(this.state);
      return;
    }
    this.state[stateNameOrCB] = newValue;
  }
}

// TODO: make this a singleton

export const gameState = new State({
  currentLevel: 0,
  score: 0,
});
