import { listenToWallets as firebaseListenToWallets } from '@echo/firestore/listeners/listen-to-wallets'
import { guardAsyncFn } from '@echo/helper/errors/guard-async-fn'
import { walletChangeHandler } from '@echo/helper/handlers/wallet-change-handler'

export function listenToWallets() {
  firebaseListenToWallets(guardAsyncFn(walletChangeHandler, void 0))
}
