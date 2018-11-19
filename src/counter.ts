import * as GenServer from "./gen-server";

export default class Counter extends GenServer.t {
  static startLink(opts: any) {
    GenServer.startLink(Counter, [], opts);
  }

  static increment(pid: GenServer.Pid): number {
    return GenServer.call(pid, "increment");
  }

  static clear(pid: GenServer.Pid): void {
    return GenServer.cast(pid, "clear");
  }

  counter: number;
  max: number;

  constructor({ max }: { max?: number }) {
    super();

    this.counter = 0;
    this.max = max || 0;
  }

  handleCall(action: string) {
    const { counter, max } = this;

    switch (action) {
      case "increment": {
        const newCounter = counter + 1;

        if (newCounter <= max) {
          this.counter = newCounter;

          return newCounter;
        } else {
          // TODO
          return counter;
        }
      }
      default: {
        return counter;
      }
    }
  }

  handleCast(action: string) {
    const { counter, max } = this;

    switch (action) {
      case "increment": {
        const newCounter = counter + 1;

        if (newCounter <= max) {
          this.counter = newCounter;

          return newCounter;
        }
      }
      default: {
        return counter;
      }
    }
  }
}
