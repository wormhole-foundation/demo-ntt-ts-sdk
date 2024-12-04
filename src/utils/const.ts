import { Ntt } from "@wormhole-foundation/sdk-definitions-ntt";
import { Chain, encoding } from "@wormhole-foundation/sdk";

export type NttContracts = {
  [key in Chain]?: Ntt.Contracts;
};

export const DEVNET_SOL_PRIVATE_KEY = encoding.b58.encode(
  new Uint8Array(
    [218,95 //.. rest of the key
    ])
);
export const DEVNET_ETH_PRIVATE_KEY =
  "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"; // Ganache default private key

export const TEST_NTT_TOKENS: NttContracts = {
  Solana: {
    token: "5trJHKSB7M6w1sC74YkxZb5D7GxA9bL6WzP4ht8FDs5V",
    manager: "NTueGPu3ckEwiQXprSjAfHC7YybrJNAG39X2AKEG9So",
    transceiver: {
      wormhole: "NTueGPu3ckEwiQXprSjAfHC7YybrJNAG39X2AKEG9So",
    },
  },
  BaseSepolia: {
    token: "0xaBc1234567890fDb48D63F11dFdc364201C9DE67",
    manager: "0xD456789a1230Cc48fDb48D63F11dFdc364201C9DE",
    transceiver: { wormhole: "0x9876aBcDeF01234567890Fdb48D63F11dFdc3642" },
  },
};