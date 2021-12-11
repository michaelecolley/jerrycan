import BlocknativeProvider from "./providers/blocknative.provider";
import PolygonProvider from "./providers/polygon.provider";
import { GasPrice } from "./types/types";

export default class GasPriceService {
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
