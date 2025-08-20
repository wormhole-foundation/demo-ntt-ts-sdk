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
    token: "8xLhmGP4yBN5V3YQJHXtuPXyr37bfqpJofijhCBa2wHQ",
    manager: "nwiUea8Fw6gGZ2kSj564KWmvS8t5xDjz7FkahPVi7Vo",
    transceiver: {
      wormhole: "77zEXrKfkNkZdj7LjZC9iGcfBhpcoPrvhDdEJjsq3geF",
    },
    quoter: "Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ"
  },
  Sui: {
    token: "0x261fd9b846984d607728733ab0cf019970caa9fbfef75ca8915762af964e190e::my_coin::MY_COIN",
    manager: "0xa1b18a0f0791394aa7b271cad6bfc4bf592e554d34c6538359c5d282a559b815",
    transceiver: { wormhole: "0x9fadc042b53ea139cef122b54f24843533c7a10200c2671628264c9d8b87e21b" },
  },
};