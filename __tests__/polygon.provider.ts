import PolygonProvider from "../src/providers/polygon.provider";
import { spyConsole } from "./spyConsole";
const nock = require("nock");
describe("Testing the Polygon Gas Service", () => {
  describe("Check class functionality", () => {
    let gasPrice;
    const url = "https://gasstation-mainnet.matic.network";

    beforeAll(async () => {
      const scope = nock(url).get("/").reply(200, {
        safeLow: 36,
        standard: 50,
        fast: 228,
        fastest: 228,
        blockTime: 2,
        blockNumber: 22376333,
      });
      const gasPriceService = await new PolygonProvider();
      gasPrice = await gasPriceService.getLatest();
      console.log(gasPrice);
    });
    it("Returned Object is not null", async () => {
      expect(gasPrice).not.toBeNull();
    });

    it("Type check output Object to contain target value datatype: number", async () => {
      expect(typeof gasPrice["price"]).toBe("number");
    });

    it("GetLatest function call returns a single key value pair: the price and a number more than 0", async () => {
      expect(gasPrice).toHaveProperty("price");
      expect(Object.keys(gasPrice).length).toBe(1);
      expect(gasPrice["price"] > 0).toBe(true);
    });
  });
  describe("Check error handling", () => {
    let gasPrice;
    const spy = spyConsole();
    beforeAll(async () => {
      nock.disableNetConnect();
    });

    it("Test that correct error is thrown when service can't connect to external API", async () => {
      let gasPriceService = await new PolygonProvider();
      gasPrice = await gasPriceService.getLatest();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(spy.console["mock"]["calls"][0]).toContain(
        "[Polygon] Gas Platform Error"
      );
    });
    it("Test that null is returned from gasPrice variable when no API call is successfully made", async () => {
      expect(gasPrice).toBeNull();
    });
  });
});
