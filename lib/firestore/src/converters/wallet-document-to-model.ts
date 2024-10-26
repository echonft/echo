import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import type { Wallet } from '@echo/model/types/wallet'
import { dissoc } from 'ramda'

export function walletDocumentToModel(document: WalletDocument): Wallet {
  return dissoc('userId', document)
}
