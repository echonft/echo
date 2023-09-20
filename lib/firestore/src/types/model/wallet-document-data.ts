import { WalletData } from '@echo/firestore/types/model/wallet-data'

export interface WalletDocumentData extends WalletData {
  id: string
  userId: string
}
