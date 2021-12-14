import BlocknativeProvider from './providers/blocknative.provider';
import PolygonProvider from './providers/polygon.provider';
import { GasPrice } from './types/types';

type Params = {
  blocknativeApiKey?: string | null;
  ethGasApiKey?: string | null;
};

const params: Params = {};

enum Provider {
  blocknative = 'BLOCKNATIVE',
  polygon = 'POLYGON'
}

enum Network {
  EthereumMainet = '1',
  Polygon = '137'
}

export default class GasPriceService {
  constructor(
    { blocknativeApiKey = null, ethGasApiKey = null } = params,
    private readonly blocknativeProvider = new BlocknativeProvider(
      blocknativeApiKey
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
     * @param chainId String value chainId that corresponds to a given eth gas price estimator provider
     * @returns A gas price estmation in GWei
     *
     */
    console.log(`configService in use: ${chainId}`);
    if (chainId == Network.EthereumMainet && provider == Provider.blocknative) {
      return await this.blocknativeProvider.getLatest();
    } else if (chainId == Network.Polygon && provider == Provider.polygon) {
      return await this.polygonProvider.getLatest();
    } else {
      console.error(
        'User input error: Pass in a supported chainId and corresponding provider name'
      );
      return null;
    }
  }
}
