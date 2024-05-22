import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { type Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function removeWallet(userId: string, wallet: Wallet): Promise<void> {
  const snapshot = await getWalletSnapshotByAddress(wallet)
  if (isNil(snapshot)) {
    throw Error(`wallet with address ${wallet.address} for chain ${wallet.chain} not found`)
  }
  if (snapshot.data().userId !== userId) {
    throw Error(`wallet not associated with userId ${userId}`)
  }
  await deleteWallet(snapshot.id)
}
