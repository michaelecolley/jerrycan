# 🔥 Jerrycan - Ethereum Gas api service aggregator

<p align="center">
  <img alt="npm version" src="https://img.shields.io/npm/v/jerrycan" />
</p>

## 🤨 What is Jerrycan?

Jerrycan is an ethereum gas api service aggregator that allows you to have a single interface for multiple gas estimation api service.

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
