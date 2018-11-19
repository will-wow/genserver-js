const servers = {};

export default class SimpleCounter {
  static startLink(opts) {
    const counter = new SimpleCounter(opts);
    const pid = Math.random();

    servers[pid] = counter;

    return pid;
  }

  static increment(pid) {
    const counter = servers[pid];

    return counter.handleIncrement();
  }

  static get(pid) {
    const counter = servers[pid];

    return counter.handleGet();
  }

  static clear(pid) {
    const counter = servers[pid];

    counter.handleReset();
  }

  constructor({ max }) {
    this.counter = 0;
    this.max = max || 10;
  }

  handleIncrement() {
    const { counter, max } = this;

    const newCounter = counter + 1;

    if (newCounter <= max) {
      this.counter = newCounter;

      return newCounter;
    } else {
      // TODO
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
