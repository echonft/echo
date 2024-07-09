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

export async function handleNftTransfer(args: WithLoggerType<Record<'transfer', NftTransfer>>): Promise<void> {
  // If it's an escrow transaction simply return, we don't manage this anymore (echo events handler does)
  if (!isEscrowing(args)) {
    const transferData = await mapNftTransferToTransferData(args)
    if (propIsNotNil('transfer', transferData)) {
      if (pathIsNil(['transfer', 'to'], transferData)) {
        await processOutTransfer(transferData)
      } else if (pathIsNil(['transfer', 'from'], transferData)) {
        await processInTransfer(
          transferData as WithLoggerType<
            Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>
          >
        )
      } else {
        await processSwapTransfer(
          transferData as WithLoggerType<
            Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>
          >
        )
      }
    }
  }
}
