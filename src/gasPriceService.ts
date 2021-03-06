import BlocknativeProvider from './providers/blocknative.provider';
import PolygonProvider from './providers/polygon.provider';
import EthGasStationProvider from './providers/ethGasStation.provider';
import { GasPrice } from './types/types';

type Params = {
  blocknativeApiKey?: string | null;
  ethGasStationApiKey?: string | null;
};

const params: Params = {};

enum Provider {
  blocknative = 'BLOCKNATIVE',
  polygon = 'POLYGON',
  ethGasStation = 'ETHGASSTATION'
}

enum Network {
  EthereumMainet = '1',
  Polygon = '137'
}

export default class GasPriceService {
  constructor(
    { blocknativeApiKey = null, ethGasStationApiKey = null } = params,
    private readonly blocknativeProvider = new BlocknativeProvider(
      blocknativeApiKey
    ),
    private ethGasStationProvider = new EthGasStationProvider(
      ethGasStationApiKey
    ),
    private readonly polygonProvider = new PolygonProvider()
  ) {}

  public async getLatest(
    chainId: string,
    provider: string
  ): Promise<GasPrice | null> {
    /**
     *
     * Returns the gas price recommendations depending on the input network key
     *
     * @param chainId String value chainId that corresponds to a given ethereum network chain id
     * @param provider String value provider that corresponds to a given eth gas price estimator provider
     * @returns A gas price estmation in GWei
     *
     */
    console.log(`ChainId in use: ${chainId}`);
    if (chainId == Network.EthereumMainet) {
      if (provider == Provider.blocknative) {
        return await this.blocknativeProvider.getLatest();
      } else if (provider == Provider.ethGasStation) {
        return await this.ethGasStationProvider.getLatest();
      }
    } else if (chainId == Network.Polygon && provider == Provider.polygon) {
      return await this.polygonProvider.getLatest();
    } else {
      console.error(
        '[User input error: Pass in a supported chainId and corresponding provider name'
      );
    }
    return null;
  }
}
