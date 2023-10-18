import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import { assertOfferItems } from '@echo/model/helpers/offer/assert/assert-offer-items'
import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addOffer(
  senderItems: NonEmptyArray<OfferItem>,
  receiverItems: NonEmptyArray<OfferItem>
): Promise<Offer> {
  const reference = getOffersCollectionReference().doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  await assertOfferIsNotADuplicate(senderItems, receiverItems)
  const id = reference.id
  const now = dayjs().unix()
  const newOffer: Offer = {
    id,
    createdAt: now,
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    receiver: head<OfferItem, OfferItem>(receiverItems).nft.owner,
    receiverItems,
    sender: head<OfferItem, OfferItem>(senderItems).nft.owner,
    senderItems,
    state: 'OPEN',
    updatedAt: now
  }
  await reference.set(newOffer)
  // add listing offers (if any)
  await addListingOffersFromOffer(newOffer)
  return newOffer
}
