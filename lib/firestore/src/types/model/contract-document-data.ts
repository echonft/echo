import type { FirestoreTokenType } from '@echo/firestore/types/model/firestore-token-type'

export interface ContractDocumentData {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: FirestoreTokenType
}
