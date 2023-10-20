import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { type Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function removeWallet(userId: string, wallet: Wallet) {
  const existingWallet = await findWalletByAddress(wallet)
  if (isNil(existingWallet) || existingWallet.userId !== userId) {
    throw Error(`wallet not associated with userId ${userId}`)
  }
  await deleteWallet(existingWallet.id)
}
