import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { modify } from 'ramda'

export function mapOfferItemFromResponse(response: OfferItemResponse): OfferItem {
  return modify('nft', mapNftFromResponse, response)
}
