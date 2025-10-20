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

export const TESTNET_SUI_MNEMONIC = ""; 

export const TEST_NTT_TOKENS: NttContracts = {
  Sepolia: {
    token: "0xc3305f621676420Ac79e7bc343c2Aff2aC0EafDD",
    manager: "0xA62D1aeD775a3a3373940bd5153e21762c6502f5",
    transceiver: {
      wormhole: "0xCA7fd7bA52209017bB3c1be71Ee2e5f9d8F178DE",
    },
  },
  BaseSepolia: {
    token: "0xa29c948Ec9e10908FBE21d2d581f8DEec07800Bc",
    manager: "0xeB8f6637737451a54E73C67eb0B3150276C7Acb9",
    transceiver: {
      wormhole: "0xd27c26cAd2026E00B324C1645F2315e71F6E0bF8",
    },
  }
};