import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { assoc, isNil, pipe } from 'ramda'

export async function addWallet(userId: string, wallet: Wallet) {
  const existingWallet = await findWalletByAddress(wallet)
  if (!isNil(existingWallet)) {
    throw Error('wallet already exists in the database')
  }
  const reference = getWalletsCollectionReference().doc()
  const { id } = reference
  const newWallet = pipe(assoc('userId', userId), assoc('id', id))(wallet) as WalletDocumentData
  await reference.set(newWallet)
  return newWallet
}
