import { OfferDocumentData } from './offer-document-data'
import { SwapState } from './swap-state'

export interface SwapDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  offer: OfferDocumentData
  postedAt?: number
  state: SwapState
}
