import { ItemRequest } from '../types/model/requests/item-request'
import { FirestoreOfferItemPrototype } from '@echo/firebase-admin'

export function mapItemRequestToRequestForOfferItemPrototype(request: ItemRequest): FirestoreOfferItemPrototype {
  return { tokenId: BigInt(request.tokenId), contract: request.target }
}
