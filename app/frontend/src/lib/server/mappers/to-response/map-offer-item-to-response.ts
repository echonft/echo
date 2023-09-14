import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { modify } from 'ramda'

export function mapOfferItemToResponse(item: FirestoreOfferItem): OfferItemResponse {
  return modify('nft', mapNftToResponse, item)
}
