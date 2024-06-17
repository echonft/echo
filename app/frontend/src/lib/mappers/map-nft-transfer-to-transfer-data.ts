import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, modify, pipe } from 'ramda'

export async function mapNftTransferToTransferData(
  args: WithLoggerType<Record<'transfer', NftTransfer>>
): Promise<WithLoggerType<Record<'transfer', Nullable<TransferData>>>> {
  const {
    transfer: { to, from }
  } = args
  const fromWallet = await getWalletByAddress(from)
  const toWallet = await getWalletByAddress(to)
  // If both wallets are not present in our database, discard
  if (isNil(fromWallet) && isNil(toWallet)) {
    return assoc('transfer', undefined, args)
  }
  return modify('transfer', pipe(assoc('from', fromWallet), assoc('to', toWallet)), args)
}
