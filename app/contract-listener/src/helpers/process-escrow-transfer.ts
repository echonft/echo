import { processInEscrowTransfer } from '@echo/contract-listener/helpers/process-in-escrow-transfer'
import { processOutEscrowTransfer } from '@echo/contract-listener/helpers/process-out-escrow-transfer'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { isEcho } from '@echo/web3/helpers/is-echo'

export async function processEscrowTransfer(args: EscrowData) {
  // Moving out of Escrow
  if (isEcho(args.from, args.chain)) {
    await processOutEscrowTransfer(args)
    // Moving in Escrow
  } else {
    await processInEscrowTransfer(args)
  }
}
