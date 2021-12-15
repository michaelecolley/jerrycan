import axios from 'axios';
import { GWEI_UNIT } from '../constants/units';
import { GasPrice } from '../types/types';

type TxSpeedOptions = 'safeLow' | 'average' | 'fast' | 'fastest';

interface EthGasStationResponse {
  fast: number;
  fastest: number;
  safeLow: number;
  average: number;
  block_time: number;
  blockNum: number;
  speed: number;
  safeLowWait: number;
  avgWait: number;
  fastWait: number;
  fastestWait: number;
}

export default class EthGasStationProvider {
  /**
   *
   * Returns the gas price recommendations via GET request from the Defi Pulse Eth Gas Station price recommendation service
   * For more information about the service visit the site [here](https://docs.ethgasstation.info/gas-price)
   *
   * @param TxSpeedOptions String value that corresponds to the keys in the TxSpeedOptions type
   * @returns An estmation in GWei based on a default
   *
   */
  constructor(ethGasApiKey?: string | null) {
    this.apiKey = ethGasApiKey;
  }
  private apiKey;

  public async getLatest(
    txSpeed: TxSpeedOptions = 'average'
  ): Promise<GasPrice | null> {
    try {
      const { data } = await axios.get<EthGasStationResponse>(
        `https://ethgasstation.info/api/ethgasAPI.json?api-key=${this.apiKey}`
      );
      return { price: data[txSpeed] * GWEI_UNIT };
    } catch (error) {
      console.error('[Eth Gas Station] Platform Error', error);
      return null;
    }
  }
}
