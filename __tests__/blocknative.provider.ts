import BlockNativeProvider from "../src/providers/blocknative.provider";
import { spyConsole } from "./spyConsole";
const nock = require("nock");

describe("Check the BlockNative Gas Service", () => {
  describe("Check happy path functionality", () => {
    let gasPrice;
    const url = "https://api.blocknative.com";
    beforeAll(async () => {
      const scope = await nock(url)
        .matchHeader("accept", "application/json, text/plain, */*")
        .matchHeader("authorization", process.env.VUE_APP_BLOCKNATIVE_DAPP_ID)
        .matchHeader("user-agent", "axios/0.21.1")
        .get("/gasprices/blockprices")
        .reply(200, testPayload);
      let gasPriceService = await new BlockNativeProvider();
      gasPrice = await gasPriceService.getLatest();
    });
    it("Test that the returned Object from the getLatest call is not null", () => {
      expect(gasPrice).not.toBeNull();
    });

    it("Test getLatest ensuring it returns the target key value pairs and they evaluate to positive numbers", () => {
      for (const property of [
        "price",
        "maxPriorityFeePerGas",
        "maxFeePerGas",
      ]) {
        expect(gasPrice).toHaveProperty(property);
        expect(typeof gasPrice[property]).toBe("number");
        expect(gasPrice[property] > 0).toBe(true);
      }
    });
    it("Test that the number of keys returned is 3 on the returned object", () => {
      expect(Object.keys(gasPrice).length).toBe(3);
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

const testPayload = {
  system: "ethereum",
  network: "main",
  unit: "gwei",
  maxPrice: 161,
  currentBlockNumber: 13780724,
  msSinceLastBlock: 3503,
  blockPrices: [
    {
      blockNumber: 13780725,
      estimatedTransactionCount: 57,
      baseFeePerGas: 101.364384469,
      estimatedPrices: [
        {
          confidence: 99,
          price: 103,
          maxPriorityFeePerGas: 2,
          maxFeePerGas: 204.73,
        },
        {
          confidence: 95,
          price: 102,
          maxPriorityFeePerGas: 1.52,
          maxFeePerGas: 204.25,
        },
        {
          confidence: 90,
          price: 102,
          maxPriorityFeePerGas: 1.5,
          maxFeePerGas: 204.23,
        },
        {
          confidence: 80,
          price: 102,
          maxPriorityFeePerGas: 1.27,
          maxFeePerGas: 204,
        },
        {
          confidence: 70,
          price: 102,
          maxPriorityFeePerGas: 1.07,
          maxFeePerGas: 203.8,
        },
      ],
    },
  ],
};
