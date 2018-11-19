import * as GenServer from "./gen-server";

interface Opts {
  max?: number;
  name?: string;
}

export default class Counter extends GenServer.t {
  static startLink(opts: Opts = {}): number {
    return GenServer.startLink(Counter, opts, opts);
  }

  static increment(pid: GenServer.Pid): number {
    return GenServer.call(pid, "increment");
  }

  static get(pid: GenServer.Pid): number {
    return GenServer.call(pid, "get");
  }

  static clear(pid: GenServer.Pid): void {
    return GenServer.cast(pid, "clear");
  }

  counter: number;
  max: number;

  constructor({ max }: Opts) {
    super();

    this.counter = 0;
    this.max = max || 10;
  }

  handleCall(action: string) {
    const { counter, max } = this;

    switch (action) {
      case "get": {
        return counter;
      }
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
    switch (action) {
      case "clear": {
        this.counter = 0;
      }
      default: {
        return this.counter;
      }
    }
  }
}
