import { type Wallet } from '@echo/model/types/wallet'
import { pick } from 'ramda'

export function mapWalletDocumentDataToWallet<T extends Wallet>(wallet: T): Wallet {
  return pick(['address', 'chain'], wallet)
}
