import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Wallet } from '@echo/model/types/wallet'
import { assoc, isNil } from 'ramda'

export async function addWallet(username: string, wallet: Wallet): Promise<NewDocument<WalletDocumentData>> {
  const walletSnapshot = await getWalletSnapshotByAddress(wallet)
  if (!isNil(walletSnapshot)) {
    throw Error(`wallet ${JSON.stringify(wallet)} already exists`)
  }
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot)) {
    throw Error(`user with username ${username} not found`)
  }
  const data = assoc('userId', userSnapshot.id, wallet)
  const id = await setReference<WalletDocumentData>({
    collectionReference: getWalletsCollectionReference(),
    data
  })
  return { id, data }
}
