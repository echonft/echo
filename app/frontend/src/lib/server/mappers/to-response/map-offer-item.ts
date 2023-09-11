import type { OfferItemResponse } from '@echo/api'
import type { OfferItem } from '@echo/firestore-types'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { modify } from 'ramda'

export function mapOfferItem(item: OfferItem): OfferItemResponse {
  return modify('nft', mapNft, item)
}
