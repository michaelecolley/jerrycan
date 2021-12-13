# 🔥 Jerrycan - Ethereum Gas api service aggregator

<p align="center">
  <img alt="npm version" src="https://img.shields.io/npm/v/jerrycan" />
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/michaelecolley/jerrycan" />
  <img alt="Github stars" src="https://shields.io/github/stars/oslabs-beta/jerrycan" />
  <img alt="Snyk" src="https://snyk.io/advisor/npm-package/jerrycan/badge.svg" href='https://snyk.io/advisor/npm-package/jerrycan' />
</p>

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

const result = gasPrice.getLatest('polygon');

console.log(result); // { price: 41000000000 }
```

## 🥨 Supported apis

[Polygon](https://gasstation-mainnet.matic.network)
[Blocknative](https://docs.blocknative.com/gas-platform)
