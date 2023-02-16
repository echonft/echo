import { DocumentData } from 'firebase/firestore'

export interface FirestoreContract extends DocumentData {
  address: string
  tokenType: string
  name?: string
  symbol?: string
  chainId: number
}
