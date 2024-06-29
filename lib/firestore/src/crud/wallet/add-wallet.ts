import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Wallet } from '@echo/model/types/wallet'
import { isEvmChain } from '@echo/utils/helpers/chains/is-evm-chain'
import { assoc, isNil, pipe } from 'ramda'

export async function addWallet(username: string, wallet: Wallet): Promise<NewDocument<WalletDocumentData>> {
  const walletSnapshot = await getWalletSnapshotByAddress(wallet)
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(`user with username ${username} not found`))
  }
  if (!isNil(walletSnapshot)) {
    const existingWallet = walletSnapshot.data()
    if (existingWallet.isEvm) {
      if (existingWallet.userId !== userSnapshot.id) {
        return Promise.reject(Error(`wallet already associated with another user`))
      }
      return { id: walletSnapshot.id, data: assoc('chain', wallet.chain, existingWallet) }
    }
    return Promise.reject(Error(`wallet ${JSON.stringify(wallet)} already exists`))
  }
  const data = pipe(assoc('userId', userSnapshot.id), assoc('isEvm', isEvmChain(wallet.chain)))(wallet)
  const id = await setReference<WalletDocumentData>({
    collectionReference: getWalletsCollectionReference(),
    data
  })
  return { id, data }
}
