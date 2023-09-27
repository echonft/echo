import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { assertOfferItems } from '@echo/firestore/helpers/offer/assert/assert-offer-items'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function addOffer(
  receiverItems: NonEmptyArray<FirestoreOfferItem>,
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  skipListingOffers = false
): Promise<FirestoreOffer> {
  const reference = firestoreApp().collection(CollectionName.OFFERS).doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  const id = reference.id
  const newOffer: FirestoreOffer = {
    id,
    createdAt: dayjs(),
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'),
    receiver: head<FirestoreOfferItem, FirestoreOfferItem>(receiverItems).nft.owner!,
    receiverItems,
    sender: head<FirestoreOfferItem, FirestoreOfferItem>(senderItems).nft.owner!,
    senderItems,
    state: 'OPEN',
    updatedAt: dayjs()
  }
  await reference.set(offerDataConverter.toFirestore(newOffer))
  // add listing offers (if any)
  if (!skipListingOffers) {
    await addListingOffersFromOffer(newOffer)
  }
  return newOffer
}
