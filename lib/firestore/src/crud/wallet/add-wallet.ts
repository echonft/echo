import { CollectionName } from '@echo/firestore/constants/collection-name'
import { walletDataConverter } from '@echo/firestore/converters/wallet/wallet-data-converter'
import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { assoc, isNil, pipe } from 'ramda'

export async function addWallet(userId: string, wallet: WalletData) {
  const existingWallet = await findWalletByAddress(wallet)
  if (!isNil(existingWallet)) {
    throw Error('wallet already exists in the database')
  }
  const reference = firestoreApp().collection(CollectionName.WALLETS).doc()
  const { id } = reference
  const newWallet = pipe(assoc('userId', userId), assoc('id', id))(wallet)
  await reference.set(walletDataConverter.toFirestore(newWallet))
  return id
}
