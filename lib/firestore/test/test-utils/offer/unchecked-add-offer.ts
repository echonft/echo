import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function uncheckedAddOffer(
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  receiverItems: NonEmptyArray<FirestoreOfferItem>
): Promise<FirestoreOffer> {
  const reference = getOffersCollection().doc()
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
  return newOffer
}
