import { DocumentData } from '@google-cloud/firestore'

export interface FirestoreContract extends DocumentData {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: string
}
