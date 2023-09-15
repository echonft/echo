import { WalletData } from '@echo/firestore/types/model/wallet-data'

export interface FirestoreWallet extends WalletData {
  id: string
  userId: string
}
