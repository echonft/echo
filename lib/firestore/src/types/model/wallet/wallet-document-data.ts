import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'

export interface WalletDocumentData extends WalletData {
  id: string
  userId: string
}
