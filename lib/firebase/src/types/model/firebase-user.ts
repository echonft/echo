import { DocumentData } from 'firebase/firestore'

export interface FirebaseUser extends DocumentData {
  wallet: string
  nonce: string
  discordId: string
}
