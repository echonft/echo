import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { mapNft } from '@echo/ui/mappers/from-api/map-nft'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { modify } from 'ramda'

export function mapOfferItem(response: OfferItemResponse): OfferItem {
  return modify('nft', mapNft, response)
}
