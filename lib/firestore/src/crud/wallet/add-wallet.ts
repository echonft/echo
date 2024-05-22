import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Wallet } from '@echo/model/types/wallet'
import { assoc, isNil } from 'ramda'

export async function addWallet(userId: string, wallet: Wallet): Promise<NewDocument<WalletDocumentData>> {
  const snapshot = await getWalletSnapshotByAddress(wallet)
  if (!isNil(snapshot)) {
    return { id: snapshot.id, data: snapshot.data() }
  }
  const data = assoc('userId', userId, wallet)
  const id = await setReference<WalletDocumentData>({
    collectionReference: getWalletsCollectionReference(),
    data
  })
  return { id, data }
}
