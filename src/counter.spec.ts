import Counter from "./counter";
import SimpleCounter from "./simple-counter";
import * as GenServer from "./gen-server";

[Counter, SimpleCounter].forEach(counter => {
  describe(counter, () => {
    let pid: number;

    afterEach(() => {
      GenServer.stop(pid);
    });

    describe("given a counter", () => {
      beforeEach(() => {
        pid = counter.startLink();
      });

      it("starts at 0", () => {
        expect(counter.get(pid)).toEqual(0);
      });

      it("increments", () => {
        expect(counter.increment(pid)).toEqual(1);
        expect(counter.increment(pid)).toEqual(2);
        expect(counter.get(pid)).toEqual(2);
      });

      it("casts to clear", done => {
        counter.increment(pid);

        // Has a value
        expect(counter.get(pid)).toEqual(1);

        // Clear in a cast.
        counter.clear(pid);

        // Still not cleared
        expect(counter.get(pid)).toEqual(1);

        setTimeout(() => {
          // Cleared!
          expect(counter.get(pid)).toEqual(0);
          done();
        }, 100);
      });

      it("increments by", () => {
        expect(counter.increment(pid, 2)).toEqual(2);
        expect(counter.increment(pid, 2)).toEqual(4);
      });
    });

    it("maxes out", () => {
      pid = counter.startLink({ max: 2 });

      expect(counter.increment(pid)).toEqual(1);
      expect(counter.increment(pid)).toEqual(2);
      // Maxed out
      expect(counter.increment(pid)).toEqual(2);
    });
  });
});

describe(Counter, () => {
  it("works with a name and a pid", () => {
    const pid = Counter.startLink({ name: "foo" });

    expect(Counter.get("foo")).toEqual(0);
    expect(Counter.get(pid)).toEqual(0);

    GenServer.stop("foo");

    expect(() => Counter.get("foo")).toThrow();
  });
});
