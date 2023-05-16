import { FirestoreOfferItemPrototype } from '@echo/firebase-admin'
import { ItemRequest } from '../types/model/requests/item-request'

export function mapItemOfferItemPrototype(request: ItemRequest): FirestoreOfferItemPrototype {
  return { tokenId: BigInt(request.tokenId), contract: request.target }
}
