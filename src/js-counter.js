import * as GenServer from "./gen-server";

export default class Counter extends GenServer.t {
  static startLink(opts) {
    return GenServer.startLink(Counter, opts, opts);
  }

  static increment(pid) {
    return GenServer.call(pid, "increment");
  }

  static get(pid) {
    return GenServer.call(pid, "get");
  }

  static clear(pid) {
    return GenServer.cast(pid, "clear");
  }

  constructor({ max }) {
    super();

    this.counter = 0;
    this.max = max || 10;
  }

  handleCall(action) {
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
          return counter;
        }
      }
      default: {
        return counter;
      }
    }
  }

  handleCast(action) {
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
