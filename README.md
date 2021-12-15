# 🔥 Jerrycan - Ethereum Gas api service aggregator

<p align="center">
<img align="center" height='250' width='250' src="https://raw.githubusercontent.com/michaelecolley/jerrycan/main/assets/jerrycan.png">

<p align="center">
  <img alt="npm version" src="https://img.shields.io/npm/v/jerrycan" />
</p>

## 🤨 What is Jerrycan?

Jerrycan is an ethereum gas api service aggregator that allows you to have a single interface for multiple gas estimation api services.

## 🥨 Supported apis

[Blocknative](https://docs.blocknative.com/gas-platform)
[EthGasStation](https://docs.ethgasstation.info/)
[Polygon](https://gasstation-mainnet.matic.network)

## 🛠 Installation

Head to your target project and type in:

`npm install jerrycan`

## 🪛 Getting started

Getting started is easy.

1. You'll need to import the GasPriceService, setting up a new GasPriceService class. If you'd like to use a provider that requires an API (Blocknative or EthGasStation) you'll need to pass in a `blocknativeApiKey` and/or `ethGasStationApiKey` (no api is required when instantiating a new GasPriceService for Polygon):

```
// Blocknative

const blocknativeApiKey = 'example';
let gasPrice = new gasPriceService({ blocknativeApiKey });

or

// EthGasStation

const ethGasStationApiKey = 'example';
gasPrice = new gasPriceService({ ethGasStationApiKey });

or

// Both

gasPrice = new gasPriceService({ blocknativeApiKey, ethGasStationApiKey });

```

2. Afterwards you will need to pass in two arguments to the `getLatest()` method. First pass in the Ethereum chain id as a string (e.g. `'1'` for the Ethereum Mainnet) and then either `'POLYGON'`, `'ETHGASSTATION'` or `'BLOCKNATIVE'` depending on which provider you want to fetch data from. This will then return the latest price in GWei.

❓ Note - If you mix and match chain id and provider incorrectly the service will return `null`.

```
// Sample use with Blocknative

import { GasPriceService } from 'jerrycan';

const blocknativeApiKey = 'example';
const gasPrice = new GasPriceService({blocknativeApiKey});

const result = gasPrice.getLatest('1','BLOCKNATIVE');

console.log(result); // { price: 41000000000 }
```
