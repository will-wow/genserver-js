const servers: { [pid: number]: t } = {};
const names: { [name: string]: number } = {};

export class t {
  handleCall(action: string, args?: any): any {
    throw new Error("Not implemented");
  }
  handleCast(action: string, args?: any): any {
    throw new Error("Not implemented");
  }
}

export type Pid = number | string;

interface Module {
  new (args?: any): t;
}

interface Opts {
  name?: string;
}

export const startLink = (module: Module, args: any = {}, opts: Opts = {}) => {
  const counter = new module(args);
  const pid = newPid();
  servers[pid] = counter;

  if (opts.name) {
    names[name] = pid;
  }

  return pid;
};

export const call = (pid: Pid, action: string, args?: any) => {
  const server = findServer(pid);

  return server.handleCall(action, args);
};

export const cast = (pid: Pid, action: string, args?: any) => {
  const server = findServer(pid);

  return server.handleCast(action, args);
};

const newPid = () => Math.random();

const findServer = (pidOrName: string | number): t => {
  const pid = names[pidOrName] || pidOrName;
  const server: t = servers[pid];

  if (!server) {
    throw new Error(`pid ${pidOrName} not found`);
  }

  return server;
};
