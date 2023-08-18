import { ListingState } from './listing-state'
import { ListingTargetDocumentData } from './listing-target-document-data'
import { OfferDocumentData } from './offer-document-data'
import { OfferItemDocumentData } from './offer-item-document-data'
import { SwapDocumentData } from './swap-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: UserDetailsDocumentData
  expiresAt: number
  items: OfferItemDocumentData[]
  offers: OfferDocumentData[]
  postedAt?: number
  state: ListingState
  swaps: SwapDocumentData[]
  targets: ListingTargetDocumentData[]
}
