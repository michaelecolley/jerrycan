require("dotenv").config();

import axios from "axios";
import { GWEI_UNIT } from "../constants/units";
import { GasPrice } from "../types/types";

type BlocknativeGasPriceConfidence = 70 | 80 | 90 | 95 | 99;

type BlocknativeEstimatedPrice = {
  confidence: BlocknativeGasPriceConfidence;
  price: number;
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
};

type BlocknativeBlockPrice = {
  blockNumber: number;
  estimatedTransactionCount: number;
  estimatedPrices: BlocknativeEstimatedPrice[];
};

type BlocknativeGasPlatformResponse = {
  unit: string;
  currentBlockNumber: number;
  maxPrice: number;
  msSinceLastBlock: number;
  network: string;
  system: string;
  blockPrices: [BlocknativeBlockPrice];
};

export default class BlocknativeProvider {
  /**
   *
   * Returns the gas price recommendations via GET request from the Blocknative gas platform API
   * For more information about the service visit the site [here](https://docs.blocknative.com/gas-platform/)
   *
   * @param confidence String value that corresponds to the callers BlocknativeGasPriceConfidence preference
   * @returns A gas price estmation in GWei
   *
   */
  private apiKey = process.env.VUE_APP_BLOCKNATIVE_DAPP_ID;
  constructor(userProvidedApiKey?: string) {
    if (userProvidedApiKey !== undefined) {
      this.apiKey = userProvidedApiKey;
    }
  }

  public async getLatest(
    confidence: BlocknativeGasPriceConfidence | "best" = "best"
  ): Promise<GasPrice | null> {
    try {
      const response = await axios.get<BlocknativeGasPlatformResponse>(
        "https://api.blocknative.com/gasprices/blockprices",
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );
      const estimatedPrices = response.data.blockPrices[0].estimatedPrices;
      let gasPrice: BlocknativeEstimatedPrice | undefined;

      // try to get 90% confidence, but make sure not to overpay. (otherwise grab 70%)
      if (confidence === "best") {
        const gasPrice70 = estimatedPrices.find(
          (estimatedPrice) => estimatedPrice.confidence === 70
        );
        const gasPrice90 = estimatedPrices.find(
          (estimatedPrice) => estimatedPrice.confidence === 90
        );

        if (gasPrice70 != null && gasPrice90 != null) {
          gasPrice =
            gasPrice90.price > 1.25 * gasPrice70.price
              ? gasPrice70
              : gasPrice90;
        }
      } else {
        gasPrice = estimatedPrices.find(
          (estimatedPrice) => estimatedPrice.confidence === confidence
        );
      }

      // gas price is in gwei
      if (gasPrice != null) {
        return {
          price: gasPrice.price * GWEI_UNIT,
          maxFeePerGas: gasPrice.maxFeePerGas * GWEI_UNIT,
          maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas * GWEI_UNIT,
        };
      }
    } catch (e) {
      console.error("[Blocknative] Gas Platform Error", e);
    }
    return null;
  }
}
