import { DocumentData } from 'firebase/firestore'

export interface FirestoreContract extends DocumentData {
  address: string
  chainId: number
}
