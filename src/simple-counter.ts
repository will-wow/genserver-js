const servers: { [pid: number]: SimpleCounter } = {};

interface Opts {
  max?: number;
  name?: string;
}

export default class SimpleCounter {
  static startLink(opts: Opts = {}) {
    const counter = new SimpleCounter(opts);
    const pid = Math.random();

    servers[pid] = counter;

    return pid;
  }

  static increment(pid: number | string, by: number = 1): number {
    const counter = servers[pid];

    return counter.handleIncrement(by);
  }

  static get(pid: number | string): number {
    const counter = servers[pid];

    return counter.handleGet();
  }

  static clear(pid: number | string): void {
    const counter = servers[pid];

    counter.handleReset();
  }

  counter: number;
  max: number;

  constructor({ max }: Opts) {
    this.counter = 0;
    this.max = max || 10;
  }

  handleIncrement(by: number) {
    const { counter, max } = this;

    const newCounter = counter + by;

    if (newCounter <= max) {
      this.counter = newCounter;

      return newCounter;
    } else {
      return counter;
    }
  }

  handleGet() {
    const { counter } = this;
    return counter;
  }

  handleReset() {
    setTimeout(() => (this.counter = 0));
  }
}
