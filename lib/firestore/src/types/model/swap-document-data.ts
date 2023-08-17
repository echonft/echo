import { ActivityDocumentData } from './activity-document-data'
import { OfferDocumentData } from './offer-document-data'
import { SwapState } from './swap-state'

export interface SwapDocumentData {
  id: string
  activities: ActivityDocumentData[]
  createdAt: number
  expiresAt: number
  offer: OfferDocumentData
  state: SwapState
}
