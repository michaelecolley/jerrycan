import PolygonProvider from "../src/providers/polygon.provider";

describe("Testing the Polygon Gas Service", () => {
  describe("Function", () => {
    it("Returned Object is not null", async () => {
      const gasPriceService = await new PolygonProvider();
      const gasPrice = await gasPriceService.getLatest();

      expect(gasPrice).not.toBeNull();
    });

    it("Type check output Object to contain target value datatype: number", async () => {
      const testObject = {};
      const gasPriceService = await new PolygonProvider();
      const gasPrice = await gasPriceService.getLatest();
      if (gasPrice != null) {
        if (gasPrice.maxPriorityFeePerGas != null) {
          testObject["maxFeePerGas"] = gasPrice.maxFeePerGas;
          testObject["maxPriorityFeePerGas"] = gasPrice.maxPriorityFeePerGas;
          expect(typeof testObject["maxFeePerGas"]).toBe("number");
        } else {
          testObject["gasPrice"] = gasPrice.price;
          expect(typeof testObject["gasPrice"]).toBe("number");
        }
      }
    });

    it("GetLatest function call returns a single key value pair: the price and a number more than 0", async () => {
      const testObject = {};
      const gasPriceService = await new PolygonProvider();
      const gasPrice = await gasPriceService.getLatest();
      if (gasPrice != null) {
        if (gasPrice.maxPriorityFeePerGas != null) {
          testObject["maxFeePerGas"] = gasPrice.maxFeePerGas;
          testObject["maxPriorityFeePerGas"] = gasPrice.maxPriorityFeePerGas;
        } else {
          testObject["gasPrice"] = gasPrice.price;
        }
        expect(testObject).toHaveProperty("gasPrice");
        expect(Object.keys(testObject).length).toBe(1);
        expect(testObject["gasPrice"] > 0).toBe(true);
      }
    });
  });
});
