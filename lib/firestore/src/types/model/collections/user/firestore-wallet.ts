import { DocumentData } from '@google-cloud/firestore'

export interface FirestoreWallet extends DocumentData {
  chainId: number
  address: string
}
