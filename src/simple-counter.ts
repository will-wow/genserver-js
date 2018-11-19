const servers: { [pid: number]: Counter } = {};
const names: { [name: string]: number } = {};

export default class Counter {
  static startLink(opts: any) {
    const counter = new Counter(opts);
    const pid = newPid();

    servers[pid] = counter;

    if (opts.name) {
      names[opts.name] = pid;
    }

    return pid;
  }

  static increment(pidOrName: string | number): number {
    const counter = findCounter(pidOrName);

    return counter.handleCallIncrement();
  }

  static clear(pidOrName: string | number): void {
    const counter = findCounter(pidOrName);

    counter.handleCastReset();
  }

  counter: number;
  max: number;

  constructor({ max }: { max?: number }) {
    this.counter = 0;
    this.max = max || 0;
  }

  handleCallIncrement = () => {
    const { counter, max } = this;

    const newCounter = counter + 1;

    if (newCounter <= max) {
      this.counter = newCounter;

      return newCounter;
    } else {
      // TODO
      return counter;
    }
  };

  handleCastReset = () => {
    setTimeout(() => (this.counter = 0));
  };
}

const newPid = () => Math.random();

const findCounter = (pidOrName: string | number): Counter => {
  const pid = names[pidOrName] || pidOrName;
  const counter = servers[pid];

  if (!counter) {
    throw new Error(`pid ${pidOrName} not found`);
  }

  return counter;
};
