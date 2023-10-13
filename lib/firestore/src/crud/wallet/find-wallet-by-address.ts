import { getWalletsCollection } from '@echo/firestore/helpers/collection/get-wallets-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { getAddress } from 'viem'

export async function findWalletByAddress(wallet: Wallet) {
  const querySnapshot = await getWalletsCollection()
    .where('address', '==', getAddress(wallet.address, wallet.chainId))
    .where('chainId', '==', wallet.chainId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
