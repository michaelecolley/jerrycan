import BlocknativeProvider from "./providers/blocknative.provider";
import PolygonProvider from "./providers/polygon.provider";
import { GasPrice } from "./types/types";

export default class GasPriceService {
  /**
   *
   * Returns the gas price recommendations depending on the input network key
   *
   * @param networkKey String value networkKey that corresponds to a given eth gas price estimator provider
   * @returns A gas price estmation in GWei
   *
   */
  constructor(
    private readonly blocknativeProvider = new BlocknativeProvider(),
    private readonly polygonProvider = new PolygonProvider()
  ) {}

  public async getLatest(networkKey: string): Promise<GasPrice | null> {
    switch (networkKey) {
      case "1":
        return await this.blocknativeProvider.getLatest();
      case "137":
        return await this.polygonProvider.getLatest();
      default:
        return null;
    }
  }
}
