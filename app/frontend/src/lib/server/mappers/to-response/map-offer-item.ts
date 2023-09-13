import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { modify } from 'ramda'

export function mapOfferItem(item: FirestoreOfferItem): OfferItemResponse {
  return modify('nft', mapNft, item)
}
