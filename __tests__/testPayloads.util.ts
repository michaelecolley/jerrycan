export const testPayload = {
  blocknative: {
    system: 'ethereum',
    network: 'main',
    unit: 'gwei',
    maxPrice: 161,
    currentBlockNumber: 13780724,
    msSinceLastBlock: 3503,
    blockPrices: [
      {
        blockNumber: 13780725,
        estimatedTransactionCount: 57,
        baseFeePerGas: 101.364384469,
        estimatedPrices: [
          {
            confidence: 99,
            price: 103,
            maxPriorityFeePerGas: 2,
            maxFeePerGas: 204.73,
          },
          {
            confidence: 95,
            price: 102,
            maxPriorityFeePerGas: 1.52,
            maxFeePerGas: 204.25,
          },
          {
            confidence: 90,
            price: 102,
            maxPriorityFeePerGas: 1.5,
            maxFeePerGas: 204.23,
          },
          {
            confidence: 80,
            price: 102,
            maxPriorityFeePerGas: 1.27,
            maxFeePerGas: 204,
          },
          {
            confidence: 70,
            price: 102,
            maxPriorityFeePerGas: 1.07,
            maxFeePerGas: 203.8,
          },
        ],
      },
    ],
  },

  polygon: {
    safeLow: 36,
    standard: 50,
    fast: 228,
    fastest: 228,
    blockTime: 2,
    blockNumber: 22376333,
  },
};
