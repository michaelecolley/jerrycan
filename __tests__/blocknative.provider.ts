import BlockNativeProvider from '../src/providers/blocknative.provider';
import { testPayload } from './testPayloads.util';
import { spyConsole } from './spyConsole.util';
import nock from 'nock';

describe('Check the BlockNative Gas Service', () => {
  describe('Check happy path functionality', () => {
    let gasPrice;
    const url = 'https://api.blocknative.com';
    beforeAll(async () => {
      const scope = await nock(url)
        .matchHeader('accept', 'application/json, text/plain, */*')
        .matchHeader('authorization', 'testApiKey')
        .matchHeader('user-agent', 'axios/0.21.1')
        .get('/gasprices/blockprices')
        .reply(200, testPayload.BlockNativeProvider);
      let gasPriceService = await new BlockNativeProvider('testApiKey');
      gasPrice = await gasPriceService.getLatest();
    });

    it('Test that the returned Object from the getLatest call is not null', () => {
      expect(gasPrice).not.toBeNull();
    });

    it('Test getLatest ensuring it returns the target key value pairs and they evaluate to positive numbers', () => {
      for (const property of [
        'price',
        'maxPriorityFeePerGas',
        'maxFeePerGas'
      ]) {
        expect(gasPrice).toHaveProperty(property);
        expect(typeof gasPrice[property]).toBe('number');
        expect(gasPrice[property] > 0).toBe(true);
      }
    });
    it('Test that the number of keys returned is 3 on the returned object', () => {
      expect(Object.keys(gasPrice).length).toBe(3);
    });
  });
  describe('Check error handling', () => {
    let gasPrice;
    const spy = spyConsole();
    beforeAll(async () => {
      nock.disableNetConnect();
    });

    it("Test that correct error is thrown when service can't connect to external API", async () => {
      let gasPriceService = await new BlockNativeProvider();
      gasPrice = await gasPriceService.getLatest();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(spy.console['mock']['calls'][0]).toContain(
        '[Blocknative] Gas Platform Error'
      );
    });
    it('Test that null is returned from gasPrice variable when no API call is successfully made', async () => {
      expect(gasPrice).toBeNull();
    });
  });
});
