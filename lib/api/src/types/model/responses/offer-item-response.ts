import { Contract } from '@echo/model'

export interface OfferItemResponse {
  contract: Contract
  tokenId: string
  balance: number | undefined
}
