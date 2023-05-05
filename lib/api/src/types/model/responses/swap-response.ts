import { OfferResponse } from './offer-response'
import { FirestoreActivityData } from '@echo/firestore'
import { SwapState } from '@echo/model'

// TODO Should all be FirestoreData
export interface SwapResponse {
  id: string
  state: SwapState
  offer: OfferResponse
  activities?: FirestoreActivityData[]
  expiresAt: number
  createdAt: number
}
