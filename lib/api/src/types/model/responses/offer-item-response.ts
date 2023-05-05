import { Contract } from '@echo/model'

// TODO Should all be FirestoreData
export interface OfferItemResponse {
  contract: Contract
  tokenId: string
  balance: number | undefined
}
