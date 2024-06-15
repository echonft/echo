import { guardAsyncFn } from '@echo/contract-listener/helpers/guard-async-fn'
import { isEscrowing } from '@echo/contract-listener/helpers/is-escrowing'
import { processEscrowTransfer } from '@echo/contract-listener/helpers/process-escrow-transfer'
import { processInTransfer } from '@echo/contract-listener/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/contract-listener/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/contract-listener/helpers/process-swap-transfer'
import { mapErc721TransferLogToTransferData } from '@echo/contract-listener/mappers/map-erc721-transfer-log-to-transfer-data'
import { mapLogToEscrowData } from '@echo/contract-listener/mappers/map-log-to-escrow-data'
import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { Erc721TransferEventLog } from '@echo/web3/types/log/erc721-transfer-event-log'
import { isNil, pipe } from 'ramda'

export async function handleErc721TransferEvent(args: EventLogHandlerArgs<Erc721TransferEventLog>) {
  const {
    log: {
      args: { from, to }
    },
    chain,
    logger
  } = args
  // If it's an escrow transaction, process it and return
  if (isEscrowing({ chain, from, to })) {
    return await guardAsyncFn({ fn: pipe(mapLogToEscrowData, processEscrowTransfer), logger })(args)
  }
  const transferData = await guardAsyncFn({ fn: mapErc721TransferLogToTransferData, logger })(args)
  if (isNil(transferData)) {
    return
  }
  // The NFT was transfered out of the Echo ecosystem, delete it from DB
  if (propIsNil('to', transferData)) {
    await guardAsyncFn({ fn: processOutTransfer, logger })(transferData)
    // The NFT was transfered to an Echo user, add it to DB
  } else if (propIsNil('from', transferData)) {
    await guardAsyncFn({ fn: processInTransfer, logger })(transferData)
    // Process swap
  } else {
    await guardAsyncFn({ fn: processSwapTransfer, logger })(
      transferData as Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>
    )
  }
}
