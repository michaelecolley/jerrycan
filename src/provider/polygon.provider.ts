import axios from "axios";
import { GWEI_UNIT } from "@/constants/units";
import { GasPrice } from "@/types/types";

type TxSpeedOptions = "safeLow" | "standard" | "fast" | "fast" | "fastest";

interface PolygonGasStationResponse {
  safeLow: number;
  standard: number;
  fast: number;
  fastest: number;
  blockTime: number;
  blockNumber: number;
}

export default class PolygonProvider {
  /**
   *
   * Returns the gas price recommendations from the Polygon Mainnet gas price recommendation service
   *
   * @param TxSpeedOptions String value that corresponds to the keys in the TxSpeedOptions type
   * @returns An estmation in GWei based on a default
   *
   */
  public async getLatest(
    txSpeed: TxSpeedOptions = "standard"
  ): Promise<GasPrice | null> {
    try {
      const { data } = await axios.get<PolygonGasStationResponse>(
        "https://gasstation-mainnet.matic.network"
      );
      return { price: data[txSpeed] * GWEI_UNIT };
    } catch (error) {
      console.log("[Polygon] Gas Platform Error", error);
      return null;
    }
  }
}

const paramsOverrides = {};
const getPrice = async () => {
  const gasPriceService = await new PolygonProvider();
  const gasPrice = await gasPriceService.getLatest();

  if (gasPrice != null) {
    if (gasPrice.maxPriorityFeePerGas != null) {
      paramsOverrides["maxFeePerGas"] = gasPrice.maxFeePerGas;
      paramsOverrides["maxPriorityFeePerGas"] = gasPrice.maxPriorityFeePerGas;
    } else {
      paramsOverrides["gasPrice"] = gasPrice.price;
    }
  }
  console.log(paramsOverrides);
};

getPrice();
