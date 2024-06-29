import { type Wallet } from '@echo/model/types/wallet'

export interface WalletDocumentData extends Wallet {
  userId: string
  isEvm: boolean
}

export type PartialWallet = Partial<WalletDocumentData> & Required<Wallet>
