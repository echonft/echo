import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getWalletSnapshot } from '@echo/firestore/crud/wallet/get-wallet'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { type Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function removeWallet(wallet: Wallet): Promise<void> {
  const walletSnapshot = await getWalletSnapshot(wallet)
  if (isNil(walletSnapshot)) {
    return Promise.reject(Error(WalletError.Exists))
  }
  await deleteWallet(walletSnapshot.id)
}
