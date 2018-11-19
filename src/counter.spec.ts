import Counter from "./counter";
import SimpleCounter from "./simple-counter";
import * as GenServer from "./gen-server";

[Counter, SimpleCounter].forEach(counter => {
  describe(counter, () => {
    describe("given a counter", () => {
      let pid: number;

      beforeEach(() => {
        pid = counter.startLink();
      });

      afterEach(() => {
        GenServer.stop(pid);
      });

      it("starts at 0", () => {
        expect(counter.get(pid)).toEqual(0);
      });

      it("increments", () => {
        expect(counter.increment(pid)).toEqual(1);
        expect(counter.increment(pid)).toEqual(2);
        expect(counter.get(pid)).toEqual(2);
      });

      it("casts to clear", (done) => {
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
    });
  });
});
