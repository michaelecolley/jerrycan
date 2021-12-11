import axios from "axios";
import { GWEI_UNIT } from "../constants/units";
import { GasPrice } from "../types/types";

type TxSpeedOptions = "safeLow" | "standard" | "fast" | "fastest";

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
   * Returns the gas price recommendations via GET request from the Polygon Mainnet gas price recommendation service
   * For more information about the service visit the site [here](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)
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
      console.error("[Polygon] Gas Platform Error", error);
      return null;
    }
  }
}
