import GasPriceService from '../src/gasPriceService';
import { testPayload } from './testPayloads.util';

const nock = require('nock');

describe('Check the GasPriceService', () => {
  describe('Check happy path functionality for the Polygon service', () => {
    let gasPrice;
    beforeAll(async () => {
      const url = 'https://gasstation-mainnet.matic.network';
      const scope = nock(url).get('/').reply(200, testPayload.PolygonProvider);
      const gasPriceService = await new GasPriceService();
      gasPrice = await gasPriceService.getLatest('137');
    });

    it('Test that the returned Object matches the expected output', () => {
      expect(gasPrice).toEqual({ price: 50000000000 });
    });
  });

  describe('Check happy path functionality for the Eth Gas Station service', () => {
    let gasPrice;
    beforeAll(async () => {
      const url = 'https://ethgasstation.info';
      const scope = nock(url)
        .matchHeader('accept', 'application/json, text/plain, */*')
        .matchHeader('user-agent', 'axios/0.21.1')
        .get(`/api/ethgasAPI.json?api-key=${process.env.DEFI_PULSE_API}`)
        .reply(200, testPayload.EthGasStationProvider);
      const gasPriceService = await new GasPriceService();
      gasPrice = await gasPriceService.getLatest('ethGasStation');
    });

    it('Test that the returned Object matches the expected output', () => {
      expect(gasPrice).toEqual({ price: 990000000000 });
    });
  });

  describe('Check happy path functionality for the Blocknative service', () => {
    let gasPrice;
    const url = 'https://api.blocknative.com';
    beforeAll(async () => {
      const scope = await nock(url)
        .matchHeader('accept', 'application/json, text/plain, */*')
        .matchHeader('authorization', process.env.VUE_APP_BLOCKNATIVE_DAPP_ID)
        .matchHeader('user-agent', 'axios/0.21.1')
        .get('/gasprices/blockprices')
        .reply(200, testPayload.BlockNativeProvider);
      const gasPriceService = await new GasPriceService();
      gasPrice = await gasPriceService.getLatest('1');
    });
    it('Test that the returned Object matches the expected output', () => {
      expect(gasPrice).toEqual({
        price: 102000000000,
        maxFeePerGas: 204230000000,
        maxPriorityFeePerGas: 1500000000
      });
    });
    describe('Check output for empty string input', () => {
      let gasPrice;
      beforeAll(async () => {
        const gasPriceService = await new GasPriceService();
        gasPrice = await gasPriceService.getLatest();
      });
      it('Test that the returned Object matches the expected output: null', () => {
        expect(gasPrice).toBeNull();
      });
    });
  });
});
