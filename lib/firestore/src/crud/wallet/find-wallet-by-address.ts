import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { formatAddress } from '@echo/utils/helpers/format-address'

export async function findWalletByAddress(wallet: Wallet) {
  const querySnapshot = await getWalletsCollectionReference()
    .where('address', '==', formatAddress(wallet.address, wallet.chainId))
    .where('chainId', '==', wallet.chainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
