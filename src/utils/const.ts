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
    token: "A2HZpxCvPJb5AFcYh5y4nwXo5S5GKwEJTmQSoc5sJP6c",
    manager: "nUCpJhfTWwwzQe8SDJhUy6oopAjEH8bqiPYpdqC2NVx",
    transceiver: {
      wormhole: "3GAribA1FSUWnsdWHc7Z1HzLgw9oTz8NeSCSy4ynvrhZ",
    },
    quoter: "Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ"
  },
  Sui: {
    token: "0x11cba8b692e316cedeed6f2156881817f8da45c1901df50cb332081a3c410dc2::my_coin::MY_COIN",
    manager: "0x86fc85ca285f5e596ad23d564cc6789a65ae3cfc3509d2668b9c21085d4b82f7",
    transceiver: { wormhole: "0xae965f041e0a9031c0ff72960d3b70a42b7b94ba577c63a2611460d07c520aa6" },
  },
};