import { OfferResponse } from './offer-response'
import { SwapActivity, SwapState } from '@echo/model'

export interface SwapResponse {
  id: string
  state: SwapState
  offer: OfferResponse
  activities?: SwapActivity[]
  expiresAt: number
  createdAt: number
}
