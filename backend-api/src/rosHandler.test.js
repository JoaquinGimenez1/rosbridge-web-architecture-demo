const rosHandler = require("./rosHandler");

let handler;
describe("rosHandler", () => {
  it("exists", () => {
    expect(rosHandler).toBeDefined();
  });

  beforeEach(() => {
    handler = new rosHandler();
  });

  describe(".connect", () => {
    it("exists", () => {
      expect(handler.connect).toBeDefined();
    });
  });

  describe(".unsubscribeToChatter", () => {
    it("exists", () => {
      expect(handler.unsubscribeToChatter).toBeDefined();
    });
  });

  describe(".subscribeToChatter", () => {
    it("exists", () => {
      expect(handler.subscribeToChatter).toBeDefined();
    });
  });
});
