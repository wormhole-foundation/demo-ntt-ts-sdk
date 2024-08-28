
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

## Running the Script

   ```bash
   npx ts-node index.ts
   ```

 **Finality delay:**

   When executing the script, you may see log messages like *Retrying Wormholescan:GetVaaByTxHash, attempt 100/750*. This is expected due to the time required for the source blockchain, like Ethereum, to reach finality, which can take up to 15 minutes. The Wormhole guardian network needs this time to produce a valid attestation (VAA). The retry attempts ensure the transaction is fully confirmed and secure before proceeding.
