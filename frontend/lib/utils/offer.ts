import { Collection } from '@echo/model/collection'
import { NewOffer, OfferStatus, OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { User } from '@echo/model/user'

export function createNewOffer(
  type: OfferType,
  collection: Collection,
  ownerItems: OfferItem[] | undefined,
  counterpartyItems: OfferItem[] | undefined,
  owner: User
): NewOffer {
  return { owner, type, status: OfferStatus.OPEN, ownerItems, counterpartyItems, collection }
}
