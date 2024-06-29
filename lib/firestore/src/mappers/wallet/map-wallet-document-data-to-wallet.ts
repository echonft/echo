import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { pick } from 'ramda'

export function mapWalletDocumentDataToWallet(wallet: PartialWallet): Wallet {
  return pick(['address', 'chain'], wallet)
}
