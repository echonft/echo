import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { pick } from 'ramda'

export function mapFirestoreWalletToWallet(wallet: WalletDocumentData) {
  return pick(['address', 'chainId'], wallet) as Wallet
}
