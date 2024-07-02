import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { isEscrowing } from '@echo/frontend/lib/helpers/webhook/is-escrowing'
import { processInTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-transfer'
import { processOutTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-transfer'
import { processSwapTransfer } from '@echo/frontend/lib/helpers/webhook/process-swap-transfer'
import { mapNftTransferToTransferData } from '@echo/frontend/lib/mappers/map-nft-transfer-to-transfer-data'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, otherwise, pipe } from 'ramda'

export async function handleNftTransfer(args: WithLoggerType<Record<'transfer', NftTransfer>>): Promise<void> {
  const logger = args.logger?.child({ fn: handleNftTransfer.name })
  // If it's an escrow transaction simply return, we don't manage this anymore (echo events handler does)
  if (isEscrowing(args)) {
    return pipe(
      assoc('logger', logger),
      processEscrowTransfer,
      otherwise((err) => {
        logger?.error({ err, transfer: args.transfer }, 'could not process escrow transfer')
      })
    )(args)
  }
  const transferData = await mapNftTransferToTransferData(assoc('logger', logger, args))
  if (propIsNotNil('transfer', transferData)) {
    if (pathIsNil(['transfer', 'to'], transferData)) {
      await pipe(
        processOutTransfer,
        otherwise((err) => {
          logger?.error({ err, transfer: transferData }, 'could not process out transfer')
        })
      )(transferData)
    } else if (pathIsNil(['transfer', 'from'], transferData)) {
      await pipe(
        processInTransfer,
        otherwise((err) => {
          logger?.error({ err, transfer: transferData }, 'could not process in transfer')
        })
      )(transferData as WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>)
    } else {
      await pipe(
        processSwapTransfer,
        otherwise((err) => {
          logger?.error({ err, transfer: transferData }, 'could not process swap transfer')
        })
      )(transferData as WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>)
    }
  }
}
