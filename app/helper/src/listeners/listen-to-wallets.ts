import { listenToWallets as firebaseListenToWallets } from '@echo/firestore/listeners/listen-to-wallets'
import { walletChangeHandler } from '@echo/helper/handlers/wallet-change-handler'

export function listenToWallets() {
  firebaseListenToWallets(walletChangeHandler)
}
