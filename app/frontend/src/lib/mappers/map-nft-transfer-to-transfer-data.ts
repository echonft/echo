import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, modify, otherwise, pipe } from 'ramda'

export async function mapNftTransferToTransferData(
  args: WithLoggerType<Record<'transfer', NftTransfer>>
): Promise<WithLoggerType<Record<'transfer', Nullable<TransferData>>>> {
  const logger = args.logger?.child({ fn: mapNftTransferToTransferData.name })
  const {
    transfer: { to, from }
  } = args
  const fromWallet = await pipe(
    getWalletByAddress,
    otherwise((err) => {
      logger?.error({ err, wallet: from }, 'could not get wallet from Firestore')
      return undefined
    })
  )(from)
  const toWallet = await pipe(
    getWalletByAddress,
    otherwise((err) => {
      logger?.error({ err, wallet: to }, 'could not get wallet from Firestore')
      return undefined
    })
  )(to)
  // If both wallets are not present in our database, discard
  if (isNil(fromWallet) && isNil(toWallet)) {
    return assoc('transfer', undefined, args)
  }
  return modify('transfer', pipe(assoc('from', fromWallet), assoc('to', toWallet)), args)
}
