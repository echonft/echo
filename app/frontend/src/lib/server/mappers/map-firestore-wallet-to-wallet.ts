import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import { pick } from 'ramda'

export function mapFirestoreWalletToWallet(wallet: FirestoreWallet) {
  return pick(['address', 'chainId'], wallet) as Wallet
}
