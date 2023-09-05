import { mapNft } from './map-nft'
import { OfferItemResponse } from '@echo/api'
import { OfferItem } from '@echo/firestore-types'
import { modify } from 'ramda'

export function mapOfferItem(item: OfferItem): OfferItemResponse {
  return modify('nft', mapNft, item)
}
