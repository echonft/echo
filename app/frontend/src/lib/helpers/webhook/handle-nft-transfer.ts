import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
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

export async function handleNftTransfer(args: WithLoggerType<Record<'transfer', NftTransfer>>) {
  // If it's an escrow transaction simply return, we dont manage this anymore (echo events handler does)
  if (isEscrowing(args)) {
    // await guardAsyncFn({ fn: processEscrowTransfer, status: ErrorStatus.BAD_REQUEST })(args)
    return
  }
  const transferData = await guardAsyncFn({ fn: mapNftTransferToTransferData, status: ErrorStatus.BAD_REQUEST })(args)
  if (propIsNotNil('transfer', transferData)) {
    if (pathIsNil(['transfer', 'to'], transferData)) {
      await guardAsyncFn({ fn: processOutTransfer, status: ErrorStatus.BAD_REQUEST })(transferData)
      // The NFT was transfered to an Echo user, add it to DB
    } else if (pathIsNil(['transfer', 'from'], transferData)) {
      await guardAsyncFn({ fn: processInTransfer, status: ErrorStatus.BAD_REQUEST })(
        transferData as WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>
      )
      // Process swap
    } else {
      await guardAsyncFn({
        fn: processSwapTransfer,
        status: ErrorStatus.BAD_REQUEST
      })(
        transferData as WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>
      )
    }
  }
}
