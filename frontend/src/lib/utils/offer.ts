import { Collection, NewOffer, OfferItem, OfferStatus, OfferType, User } from '@echo/model'

export function createNewOffer(
  type: OfferType,
  collection: Collection,
  ownerItems: OfferItem[] | undefined,
  counterpartyItems: OfferItem[] | undefined,
  owner: User
): NewOffer {
  return { owner, type, status: OfferStatus.OPEN, ownerItems, counterpartyItems, collection }
}
