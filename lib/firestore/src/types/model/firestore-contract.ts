import type { FirestoreTokenType } from '@echo/firestore/types/model/firestore-token-type'

export interface FirestoreContract {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: FirestoreTokenType
}
