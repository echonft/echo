import type { Wallet } from '@echo/model/types/wallet'

export interface WalletDocumentData extends Wallet {
  id: string
  userId: string
}
