import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Wallet } from '@echo/model/types/wallet'
import { isEvmChain } from '@echo/utils/helpers/is-evm-chain'
import { assoc, isNil, pipe } from 'ramda'

export async function addWallet(username: string, wallet: Wallet): Promise<NewDocument<WalletDocumentData>> {
  const walletSnapshot = await getWalletSnapshotByAddress(wallet)
  if (!isNil(walletSnapshot)) {
    if (walletSnapshot.data().isEvm) {
      return { id: walletSnapshot.id, data: assoc('chain', wallet.chain, walletSnapshot.data()) }
    }
    throw Error(`wallet ${JSON.stringify(wallet)} already exists`)
  }
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot)) {
    throw Error(`user with username ${username} not found`)
  }
  const data = pipe(assoc('userId', userSnapshot.id), assoc('isEvm', isEvmChain(wallet.chain)))(wallet)
  const id = await setReference<WalletDocumentData>({
    collectionReference: getWalletsCollectionReference(),
    data
  })
  return { id, data }
}
