import { OfferItemResponse } from '../types/model/responses/offer-item-response'
import { OfferItem } from '@echo/model'

// TODO Tests
export function mapOfferItemToResponse(offerItem: OfferItem): OfferItemResponse {
  return {
    ...offerItem,
    tokenId: offerItem.tokenId.toString()
  }
}
