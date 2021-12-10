export function spyConsole() {
  let spy = {
    console: {},
  };
  beforeEach(() => {
    spy.console = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  return spy;
}
