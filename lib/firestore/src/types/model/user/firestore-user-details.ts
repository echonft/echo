import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'

export interface FirestoreUserDetails {
  discord: {
    avatarUrl: string
    username: string
  }
  username: string
  wallet: WalletData
}
