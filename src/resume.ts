import {
  Wormhole,
  signSendWait,
} from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/platforms/evm";
import solana from "@wormhole-foundation/sdk/platforms/solana";

// register protocol implementations
import "@wormhole-foundation/sdk-evm-ntt";
import "@wormhole-foundation/sdk-solana-ntt";
import { TEST_NTT_TOKENS } from "./utils/const";
import { getSigner } from "./utils/helpers";

(async function () {
  const wh = new Wormhole("Testnet", [solana.Platform, evm.Platform]);
  
  // Set up destination chain and signer
  const dst = wh.getChain("Solana");
  const dstSigner = await getSigner(dst);
  
  // Set up destination NTT protocol
  const dstNtt = await dst.getProtocol("Ntt", {
    ntt: TEST_NTT_TOKENS[dst.chain],
  });
  
  // TODO: Replace with the actual Wormhole transaction ID
  const stuckTxId = "YOUR_TRANSACTION_ID_HERE"; 
  
  // Get the VAA
  const vaa = await wh.getVaa(
    stuckTxId,
    "Ntt:WormholeTransfer",
    25 * 60 * 1000
  );
  console.log(vaa);
  
  // Redeem the transfer
  const dstTxids = await signSendWait(
    dst,
    dstNtt.redeem([vaa!], dstSigner.address.address),
    dstSigner.signer
  );
  console.log("dstTxids", dstTxids);
})();
