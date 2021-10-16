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

    it.todo("on connection");
    it.todo("on error");
    it.todo("on close");
  });

  describe(".unsubscribeToChatter", () => {
    it("exists", () => {
      expect(handler.unsubscribeToChatter).toBeDefined();
    });

    it.todo("unsubscribe from topic");
  });

  describe(".subscribeToChatter", () => {
    it("exists", () => {
      expect(handler.subscribeToChatter).toBeDefined();
    });

    it.todo("connect to ros");
    it.todo("set new listener and subscribe");
  });
});
