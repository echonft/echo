import { SwapResponse } from '../types/model/responses/swap-response'
import { mapActivityToResponse } from './map-activity-to-response'
import { mapDateToNumber } from './map-date-to-number'
import { mapOfferToResponse } from './map-offer-to-response'
import { Swap } from '@echo/model'

// TODO Use ramda
export function mapSwapToResponse(swap: Swap): SwapResponse {
  return {
    ...swap,
    activities: swap.activities?.map(mapActivityToResponse),
    offer: mapOfferToResponse(swap.offer),
    createdAt: mapDateToNumber(swap.createdAt),
    expiresAt: mapDateToNumber(swap.expiresAt)
  }
}
