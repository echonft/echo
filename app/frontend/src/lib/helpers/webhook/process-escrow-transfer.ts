import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { isEcho } from '@echo/web3/helpers/is-echo'

export async function processEscrowTransfer(args: NftTransfer) {
  // Moving out of Escrow
  if (isEcho(args.from, args.chain)) {
    await processOutEscrowTransfer(args)
    // Moving in Escrow
  } else {
    await processInEscrowTransfer(args)
  }
}
