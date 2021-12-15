import EthGasStationProvider from '../src/providers/ethGasStation.provider';
import { testPayload } from './testPayloads.util';
import { spyConsole } from './spyConsole.util';
import nock from 'nock';

describe('Testing the Eth Gas Station Service', () => {
  describe('Check class functionality', () => {
    let gasPrice;
    const url = `https://ethgasstation.info`;

    beforeAll(async () => {
      const scope = nock(url)
        .matchHeader('accept', 'application/json, text/plain, */*')
        .matchHeader('user-agent', 'axios/0.21.1')
        .get(`/api/ethgasAPI.json?api-key=testApiKey`)
        .reply(200, testPayload.EthGasStationProvider);
      const gasPriceService = await new EthGasStationProvider('testApiKey');
      gasPrice = await gasPriceService.getLatest();
    });
    it('Returned Object is not null', async () => {
      expect(gasPrice).not.toBeNull();
    });

    it('Type check output Object to contain target value datatype: number', async () => {
      expect(typeof gasPrice['price']).toBe('number');
    });

    it('GetLatest function call returns a single key value pair: the price and a number more than 0', async () => {
      expect(gasPrice).toHaveProperty('price');
      expect(Object.keys(gasPrice).length).toBe(1);
      expect(gasPrice['price'] > 0).toBe(true);
    });
  });
  describe('Check error handling', () => {
    let gasPrice;
    const spy = spyConsole();
    beforeAll(async () => {
      nock.disableNetConnect();
    });

    it("Test that correct error is thrown when service can't connect to external API", async () => {
      let gasPriceService = await new EthGasStationProvider(null);
      gasPrice = await gasPriceService.getLatest();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(spy.console['mock']['calls'][0]).toContain(
        '[Eth Gas Station] Platform Error'
      );
    });
    it('Test that null is returned from gasPrice variable when no API call is successfully made', async () => {
      expect(gasPrice).toBeNull();
    });
  });
});
