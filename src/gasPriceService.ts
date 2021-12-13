import BlocknativeProvider from './providers/blocknative.provider';
import PolygonProvider from './providers/polygon.provider';
import EthGasStationProvider from './providers/ethGasStation.provider';
import { GasPrice } from './types/types';

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
    blockNativeProvidedApiKey?: string,
    private readonly blocknativeProvider = new BlocknativeProvider(
      blockNativeProvidedApiKey
    ),
    private readonly ethGasStationProvider = new EthGasStationProvider(),
    private readonly polygonProvider = new PolygonProvider()
  ) {}

  public async getLatest(configService?: string): Promise<GasPrice | null> {
    console.log(`configService in use: ${configService}`);
    switch (configService) {
      case '1':
        return await this.blocknativeProvider.getLatest();
      case 'blocknative':
        return await this.blocknativeProvider.getLatest();
      case 'ethGasStation':
        return await this.ethGasStationProvider.getLatest();
      case '137':
        return await this.polygonProvider.getLatest();
      case 'polygon':
        return await this.polygonProvider.getLatest();
      default:
        return null;
    }
  }
}
