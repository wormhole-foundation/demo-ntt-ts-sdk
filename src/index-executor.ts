import {
  ChainAddress,
  TransactionId,
  Wormhole,
  amount,
  signSendWait,
} from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/platforms/evm";
import solana from "@wormhole-foundation/sdk/platforms/solana";
import sui from "@wormhole-foundation/sdk/platforms/sui";

// register protocol implementations
import "@wormhole-foundation/sdk-evm-ntt";
import "@wormhole-foundation/sdk-solana-ntt";
import "@wormhole-foundation/sdk-sui-ntt";
import { NttExecutorRoute, nttExecutorRoute } from "@wormhole-foundation/sdk-route-ntt";
import { TEST_NTT_TOKENS } from "./utils/const";
import { getSigner, convertToExecutorConfig } from "./utils/helpers";
import { routes } from "@wormhole-foundation/sdk";


(async function () {
  // TODO: change to "Mainnet" for mainnet
  const network = "Testnet"; 
  const wh = new Wormhole(network, [solana.Platform, evm.Platform, sui.Platform], {
    // optional way to use private RPCs, especially recommended for mainnet 
    //   "chains": {
    //     "Sui": {
    //       "rpc": "http://127.0.0.1:8546"
    //     },
    //     "Solana": {
    //       "rpc": "http://127.0.0.1:8899"
    //     }
    //   }
  });
  const src = wh.getChain("Solana");
  const dst = wh.getChain("Sui");
  const srcSigner = await getSigner(src);
  // TODO: change destination address 
  const dstAddress: ChainAddress = Wormhole.chainAddress("Sui","0xa43");
  console.log("Source signer address:", srcSigner.address.address);

  const srcNtt = await src.getProtocol("Ntt", {
     ntt: TEST_NTT_TOKENS[src.chain],
  });
  const srcNttExecutor = await src.getProtocol("NttWithExecutor", {
     ntt: TEST_NTT_TOKENS[src.chain],
  });

  let executorConfig = convertToExecutorConfig(TEST_NTT_TOKENS);
  // TODO: optional override of the msgValue for transfers to Solana
  // NTT transfers to EVM chains should set the msgValue to 0
  executorConfig.referrerFee = {
    feeDbps: 0n, // No referrer fee
    perTokenOverrides: {
      Solana: {
        [TEST_NTT_TOKENS.Solana?.token || ""]: {
          msgValue: 10_000_000n + 1_500_000n, 
        }
      }
    }
  };
  const executorRoute = nttExecutorRoute(executorConfig);
  const routeInstance = new executorRoute(wh);

  // Create transfer request
  const srcTokenAddr = TEST_NTT_TOKENS[src.chain]!.token;
  const dstTokenAddr = TEST_NTT_TOKENS[dst.chain]!.token;
  const tr = await routes.RouteTransferRequest.create(wh, {
    source: Wormhole.tokenId(src.chain, srcTokenAddr),
    destination: Wormhole.tokenId(dst.chain, dstTokenAddr),
  });

  //TODO: change to token amount that should be transferred
  const amtString = "1.7";
  const amt = amount.units(
    amount.parse(amtString, await srcNtt.getTokenDecimals())
  );
  // Validate parameters
  const validated = await routeInstance.validate(tr, {
    amount: amtString,
  });
   if (!validated.valid) {
     throw new Error(`Validation failed: ${validated.error.message}`);
   }
  const validatedParams: NttExecutorRoute.ValidatedParams = validated.params as NttExecutorRoute.ValidatedParams;
  // Get quote from route
  const routeQuote = await routeInstance.fetchExecutorQuote(tr, validatedParams);

  const xfer = () =>
    srcNttExecutor.transfer(srcSigner.address.address, dstAddress, amt, routeQuote, srcNtt);

  // Get calldata for simulation on tenderly (optional)
  const firstTx = await xfer().next();
  if (!firstTx.done) {
    const txData = firstTx.value.transaction.data;
    console.log("Transfer Calldata for EVM simulation:", txData);
  }

  // Initiate the transfer
  const txids: TransactionId[] = await signSendWait(src, xfer(), srcSigner.signer);
  console.log("Source txs", txids);

  const vaa = await wh.getVaa(
    txids[txids.length - 1]!.txid,
    "Ntt:WormholeTransfer",
    25 * 60 * 1000
  );
  
  const sourceTxId = txids[txids.length - 1]!.txid;
  const wormholeScanUrl = `https://wormholescan.io/#/tx/${sourceTxId}?network=${network}`;
  console.log("WormholeScan URL:", wormholeScanUrl);
})(); 