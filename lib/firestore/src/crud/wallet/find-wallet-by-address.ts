import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { toLower } from 'ramda'

export async function findWalletByAddress(wallet: Wallet) {
  const querySnapshot = await getWalletsCollectionReference()
    .where('address', '==', toLower(wallet.address))
    .where('chainId', '==', wallet.chainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
