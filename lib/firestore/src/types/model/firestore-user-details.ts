import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'

export interface FirestoreUserDetails {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  username: string
  wallet: FirestoreWallet
}
