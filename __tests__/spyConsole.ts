export function spyConsole() {
  /**
   *
   * Helps debug error logs by allowing the user to use Jest to access Stderr...
   * ...and test the output
   *
   * @returns An object containing error data from stderr
   *
   */
  let spy = {
    console: {},
  };
  beforeEach(() => {
    spy.console = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  return spy;
}
