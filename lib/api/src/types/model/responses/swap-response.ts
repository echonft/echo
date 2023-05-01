import { OfferActivityResponse } from './offer-activity-response'
import { OfferResponse } from './offer-response'
import { SwapState } from '@echo/model'

export interface SwapResponse {
  id: string
  state: SwapState
  offer: OfferResponse
  activities?: OfferActivityResponse[]
  expiresAt: number
  createdAt: number
}
