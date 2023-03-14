import { DocumentData } from 'firebase/firestore'

export interface FirestoreWallet extends DocumentData {
  chainId: number
  address: string
}
