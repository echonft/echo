import { DocumentData } from 'firebase-admin/firestore'

export interface ContractDocumentData extends DocumentData {
  address: string
  addressLowercase: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: string
}
