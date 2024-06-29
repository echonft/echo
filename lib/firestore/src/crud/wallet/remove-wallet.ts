import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { type Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function removeWallet(username: string, wallet: Wallet): Promise<void> {
  const walletSnapshot = await getWalletSnapshotByAddress(wallet)
  if (isNil(walletSnapshot)) {
    return Promise.reject(Error(`wallet with address ${wallet.address} for chain ${wallet.chain} not found`))
  }
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(`user with username ${username} not found`))
  }
  if (walletSnapshot.data().userId !== userSnapshot.id) {
    return Promise.reject(Error(`wallet not associated with userId ${userSnapshot.id}`))
  }
  await deleteWallet(walletSnapshot.id)
}
