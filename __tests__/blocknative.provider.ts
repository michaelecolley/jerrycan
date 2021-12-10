import BlockNativeProvider from "../src/provider/blocknative.provider";
import * as nock from "nock";
import { spyConsole } from "./spyConsole";

describe("Check the BlockNative Gas Service", () => {
  describe("Check happy path functionality", () => {
    let testObject = {};
    let gasPrice;
    beforeAll(async () => {
      let gasPriceService = await new BlockNativeProvider();
      gasPrice = await gasPriceService.getLatest();
      if (gasPrice != null) {
        testObject["maxFeePerGas"] = gasPrice.maxFeePerGas;
        testObject["maxPriorityFeePerGas"] = gasPrice.maxPriorityFeePerGas;
        testObject["gasPrice"] = gasPrice.price;
      }
    });
    it("Test that the returned Object from the getLatest call is not null", () => {
      expect(gasPrice).not.toBeNull();
    });

    it("Test getLatest ensuring it returns a single key value pair: the price and a number more than 0", () => {
      for (const property of [
        "gasPrice",
        "maxPriorityFeePerGas",
        "maxFeePerGas",
      ]) {
        expect(testObject).toHaveProperty(property);
        expect(typeof testObject[property]).toBe("number");
        expect(testObject[property] > 0).toBe(true);
      }
    });
    it("Test that the number of keys returned is 3 on the returned object", () => {
      expect(Object.keys(testObject).length).toBe(3);
    });
  });

  describe("Check error handling", () => {
    let gasPrice;
    const spy = spyConsole();
    beforeAll(async () => {
      nock.disableNetConnect();
    });

    it("Test that correct error is thrown when service can't connect to external API", async () => {
      let gasPriceService = await new BlockNativeProvider();
      gasPrice = await gasPriceService.getLatest();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(spy.console["mock"]["calls"][0]).toContain(
        "[Blocknative] Gas Platform Error"
      );
    });
    it("Test that null is returned from gasPrice variable when no API call is successfully made", async () => {
      expect(gasPrice).toBeNull();
    });
  });
});
