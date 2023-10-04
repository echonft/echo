import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { getAddress } from 'viem'

export async function findWalletByAddress(wallet: WalletData) {
  const querySnapshot = await getWalletsCollection()
    .where('address', '==', getAddress(wallet.address, wallet.chainId))
    .where('chainId', '==', wallet.chainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
