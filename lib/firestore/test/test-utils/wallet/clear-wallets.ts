import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWallets } from '@test-utils/wallet/get-all-wallets'

export async function clearWallets() {
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    try {
      await deleteWallet(wallet.id)
    } catch (e) {
      // nothing to do
    }
  }
}
