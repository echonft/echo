import { DocumentData } from 'firebase/firestore'

export interface FirestoreWallet extends DocumentData {
  chainId: string
  address: string
}
