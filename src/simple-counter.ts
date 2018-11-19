const servers: { [pid: number]: SimpleCounter } = {};
const names: { [name: string]: number } = {};

export default class SimpleCounter {
  static startLink(opts: any = {}) {
    const counter = new SimpleCounter(opts);
    const pid = newPid();

    servers[pid] = counter;

    if (opts.name) {
      names[opts.name] = pid;
    }

    return pid;
  }

  static increment(pidOrName: string | number): number {
    const counter = findCounter(pidOrName);

    return counter.handleIncrement();
  }

  static get(pidOrName: string | number): number {
    const counter = findCounter(pidOrName);

    return counter.handleGet();
  }

  static clear(pidOrName: string | number): void {
    const counter = findCounter(pidOrName);

    counter.handleReset();
  }

  counter: number;
  max: number;

  constructor({ max }: { max?: number }) {
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

const newPid = () => Math.random();

const findCounter = (pidOrName: string | number): SimpleCounter => {
  const pid = names[pidOrName] || pidOrName;
  const counter = servers[pid];

  if (!counter) {
    throw new Error(`pid ${pidOrName} not found`);
  }

  return counter;
};
