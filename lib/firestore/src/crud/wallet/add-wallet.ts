import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { assoc, isNil, pipe } from 'ramda'

export async function addWallet(userId: string, wallet: WalletData) {
  const existingWallet = await findWalletByAddress(wallet)
  if (!isNil(existingWallet)) {
    throw Error('wallet already exists in the database')
  }
  const reference = getWalletsCollection().doc()
  const { id } = reference
  const newWallet = pipe(assoc('userId', userId), assoc('id', id))(wallet) as FirestoreWallet
  await reference.set(newWallet)
  return id
}
