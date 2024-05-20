import { findWalletByAddress } from '@echo/firestore/crud/wallet/find-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { assoc, isNil } from 'ramda'

export async function addWallet(userId: string, wallet: Wallet): Promise<WalletDocumentData> {
  const existingWallet = await findWalletByAddress(wallet)
  if (!isNil(existingWallet)) {
    return existingWallet
  }
  const data = assoc('userId', userId, wallet)
  await setReference<WalletDocumentData>({
    collectionReference: getWalletsCollectionReference(),
    data
  })
  return data
}
