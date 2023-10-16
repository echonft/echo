import { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { pick } from 'ramda'

export function mapWalletDocumentDataToWallet(wallet: WalletDocumentData): Wallet {
  return pick(['address', 'chainId'])(wallet) as Wallet
}
