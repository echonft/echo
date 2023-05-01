import { SwapResponse } from '../types/model/responses/swap-response'
import { mapOfferActivityToResponse } from './map-offer-activity-to-response'
import { mapOfferToResponse } from './map-offer-to-response'
import { Swap } from '@echo/model'

export function mapSwapToResponse(swap: Swap): SwapResponse {
  return {
    ...swap,
    activities: swap.activities?.map(mapOfferActivityToResponse),
    offer: mapOfferToResponse(swap.offer),
    expiresAt: swap.expiresAt.unix(),
    createdAt: swap.createdAt.unix()
  }
}
