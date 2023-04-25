import { ItemRequest } from '../types/model/requests/item-request'
import { FirestoreRequestForOfferItemPrototype } from '@echo/firebase-admin'

export function mapItemRequestToRequestForOfferItemPrototype(
  request: ItemRequest
): FirestoreRequestForOfferItemPrototype {
  return { tokenId: request.tokenId, contract: request.target }
}
