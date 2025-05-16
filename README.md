# NTT deployment testing with Wormhole TS-SDK

## Overview

This project demonstrates the use of the Wormhole TS-SDK to facilitate token transfers between different blockchain networks, after performing a deployment of the [Native Token Transfer](https://docs.wormhole.com/wormhole/native-token-transfers/overview) framework. Before running the script, you need to set up the necessary configurations and provide your deployment details.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js & TypeScript
- npm or yarn 

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/wormhole-foundation/demo-ntt-ts-sdk.git
   cd /demo-ntt-ts-sdk
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn 
   ```

3. **Update Configuration:**

   - **Reference `deployment.json`:**
     The `example-deployment.json` file contains an example deployment file for your blockchain networks. You should have a similar file in your project after going through the an NTT [deployment](https://docs.wormhole.com/wormhole/native-token-transfers/deployment/installation)

   - **Update `const.ts`:**
     Update the `TEST_NTT_TOKENS` object in the `const.ts` file with your token, manager, and transceiver details from the `deployment.json` file:

     ```typescript
     export const TEST_NTT_SPL22_TOKENS: NttContracts = {
       Solana: {
         token: "NTTSolanaTokenAddress",
         manager: "NTTSolanaManagerAddress",
         transceiver: {
           wormhole: "NTTSolanaTransceiverAddress",
         },
       },
       BaseSepolia: {
         token: "NTTBaseSepoliaTokenAddress",
         manager: "NTTBaseSepoliaManagerAddress",
         transceiver: { wormhole: "NTTBaseSepoliaTransceiverAddress" },
       },
     };
     ```

   - **Set Private Keys:**
     You need to set your Ethereum and Solana private keys for this example. You can either set the env variables `ETH_PRIVATE_KEY` and `SOL_PRIVATE_KEY` OR replace this constants:

     ```typescript
     export const DEVNET_SOL_PRIVATE_KEY = encoding.b58.encode(
       new Uint8Array(
         [218, 95 /* ... rest of the key */]
       )
     );

     export const DEVNET_ETH_PRIVATE_KEY =
       "0xYourEthereumPrivateKey";
     ```

   - **Custom RPC Configuration (Optional):**
     To override the default RPC endpoints used by the SDK, provide a configuration object when initializing the Wormhole instance:

     ```typescript
     const wh = new Wormhole("Testnet", [solana.Platform, evm.Platform], {
       "chains": {
         "BaseSepolia": {
           "rpc": "https://your-base-sepolia-rpc.example.com"
         },
         "Solana": {
           "rpc": "https://your-solana-rpc.example.com"
         }
       }
     });
     ```

## Running the Script

```bash
npx ts-node index.ts
```

## Configuration Options

### Transfer Route Configuration

The default script transfers tokens from BaseSepolia to Solana. To change the direction and transfer from Solana to Sepolia, modify these lines in the script:

```typescript
// For Solana → Sepolia
const src = wh.getChain("Solana");
const dst = wh.getChain("Sepolia");
```

### Transfer Amount
To modify the amount of tokens being transferred change the following line in the ⁠index.ts file:
```typescript
const amt = amount.units(
  amount.parse("1", await srcNtt.getTokenDecimals())
);
```
Replace ⁠"1" with your desired transfer amount as a string. The amount will be parsed according to the token's decimal places.


### Finality Delay

When executing the script, you may see log messages like *Retrying Wormholescan:GetVaaByTxHash, attempt 100/750*. This is expected due to the time required for the source blockchain, like Ethereum, to reach finality, which can take up to 15 minutes. The Wormhole guardian network needs this time to produce a valid attestation (VAA). The retry attempts ensure the transaction is fully confirmed and secure before proceeding.

### Resuming Failed Transfers

If a transfer gets stuck, you can use the `resume.ts` script to attempt to redeem the transfer. To use it:

1. Open `src/resume.ts`
2. Replace `YOUR_TRANSACTION_ID_HERE` with the Wormhole transaction ID of the stuck transfer
3. Run the script:
   ```bash
   npx ts-node src/resume.ts
   ```

The script will attempt to fetch the VAA (Verified Action Approval) and redeem the transfer on the destination chain. Make sure you have the correct destination chain and signer configured in the script before running it.
