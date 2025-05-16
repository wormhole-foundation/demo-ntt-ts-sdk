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
    token: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    manager: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    transceiver: {
      wormhole: "3vJjDYwPKkhBykQU1BkJAnCrMp9U4qZn9hFMbvQJCyU3",
    },
    quoter: "Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ"
  },
  Monad: {
    token: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    manager: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    transceiver: { wormhole: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" },
  },
};