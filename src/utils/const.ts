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
  Solana: {
    token: "ANRdVy8fvhiJqXccFPpZijty5jQqkBp5Xjw4NXL1CsU1",
    manager: "nasiB9hbB1s5ZWXAR54fjr3Y4HVTTzJMXNPAuedggQA",
    transceiver: {
      wormhole: "Ba8FkdiKmNuGiwiZ6PVzkyR7uE2kMGV1aAYUh3XReLuA",
    },
    quoter: "Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ"
  },
  Sui: {
    token: "0x84a63e6b60767903c32b403fa6817fee6983470429e63bcf6da78a69ff00e4be::my_coin::MY_COIN",
    manager: "0x8eb275808fe2f03ba24c9033de6322653262d3a360ee48541be6d6a072414306",
    transceiver: { wormhole: "0x0540541acbd520955b0150b97c77e6c8b4ab3847fe8768b75551adcc3c5098ec" },
  },
};