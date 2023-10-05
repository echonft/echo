import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { assertOfferItems } from '@echo/firestore/helpers/offer/assert/assert-offer-items'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addOffer(
  receiverItems: NonEmptyArray<FirestoreOfferItem>,
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  skipListingOffers = false
): Promise<FirestoreOffer> {
  const reference = getOffersCollection().doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  const id = reference.id
  const now = dayjs().unix()
  const newOffer: FirestoreOffer = {
    id,
    createdAt: now,
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    receiver: head<FirestoreOfferItem, FirestoreOfferItem>(receiverItems).nft.owner,
    receiverItems,
    sender: head<FirestoreOfferItem, FirestoreOfferItem>(senderItems).nft.owner,
    senderItems,
    state: 'OPEN',
    updatedAt: now
  }
  await reference.set(newOffer)
  // add listing offers (if any)
  if (!skipListingOffers) {
    await addListingOffersFromOffer(newOffer)
  }
  return newOffer
}
