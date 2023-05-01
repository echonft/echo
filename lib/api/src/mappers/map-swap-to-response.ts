import { SwapResponse } from '../types/model/responses/swap-response'
import { mapOfferToResponse } from './map-offer-to-response'
import { Swap } from '@echo/model'

export function mapSwapToResponse(swap: Swap): SwapResponse {
  return {
    ...swap,
    offer: mapOfferToResponse(swap.offer),
    expiresAt: swap.expiresAt.unix(),
    createdAt: swap.createdAt.unix()
  }
}
