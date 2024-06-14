import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { isEscrowing } from '@echo/frontend/lib/helpers/webhook/is-escrowing'
import { processEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-escrow-transfer'
import { processInTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-transfer'
import { processOutTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-transfer'
import { processSwapTransfer } from '@echo/frontend/lib/helpers/webhook/process-swap-transfer'
import { mapNftTransferToTransferData } from '@echo/frontend/lib/mappers/map-nft-transfer-to-transfer-data'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export async function handleNftTransfer(nftTransfer: NftTransfer) {
  const { chain, from, to } = nftTransfer
  // If it's an escrow transaction, process it and return
  if (isEscrowing({ chain, from, to })) {
    await guardAsyncFn(processEscrowTransfer, ErrorStatus.BAD_REQUEST)(nftTransfer)
    return
  }
  const transferData = await guardAsyncFn(mapNftTransferToTransferData, ErrorStatus.BAD_REQUEST)(nftTransfer)
  if (isNil(transferData)) {
    return
  }
  // The NFT was transfered out of the Echo ecosystem, delete it from DB
  if (propIsNil('to', transferData)) {
    await guardAsyncFn(processOutTransfer, ErrorStatus.BAD_REQUEST)(transferData)
    // The NFT was transfered to an Echo user, add it to DB
  } else if (propIsNil('from', transferData)) {
    await guardAsyncFn(processInTransfer, ErrorStatus.BAD_REQUEST)(transferData)
    // Process swap
  } else {
    await guardAsyncFn(
      processSwapTransfer,
      ErrorStatus.BAD_REQUEST
    )(transferData as Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>)
  }
}
