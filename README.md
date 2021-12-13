# 🔥 Jerrycan - Ethereum Gas api service aggregator

## 🛠 Installation

Head to your target project and type in:

`npm install jerrycan`

## 🪛 Getting started

Getting started is easy. You import the GasPriceService, setting up a new GasPriceService class.

When you do this if you are using the Blocknative api you will need to pass in your api key into the instantiated object - GasPriceService.

Following this you can pass in either 'polygon' or 'blocknative' on the getLatest method. This will then return the latest price in GWei

```
import { GasPriceService } from 'jerrycan';

const gasPrice = new GasPriceService();

const result = gasPrice.getLatest('polygon'); // { price: 41000000000 }

console.log(result);
```

## 🥨 Supported apis

Blocknative
[Polygon](https://gasstation-mainnet.matic.network)
[Blocknative](https://docs.blocknative.com/gas-platform)
