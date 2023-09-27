import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { isNil } from 'ramda'

export async function removeWallet(userId: string, wallet: WalletData) {
  const existingWallet = (await findWalletByAddress(wallet)) as FirestoreWallet
  if (isNil(existingWallet) || existingWallet.userId !== userId) {
    throw Error(`wallet not associated with userId ${userId}`)
  }
  await deleteWallet(existingWallet.id)
}
