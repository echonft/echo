import { OfferItem } from '../../types/offer-item'
import { mapNft } from './map-nft'
import type { OfferItemResponse } from '@echo/api/types'
import { modify } from 'ramda'

export function mapOfferItem(response: OfferItemResponse): OfferItem {
  return modify('nft', mapNft, response)
}
