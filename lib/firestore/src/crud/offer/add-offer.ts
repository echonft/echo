import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { addOfferToListing } from '@echo/firestore/crud/listing/add-offer-to-listing'
import { getListingsForOffer } from '@echo/firestore/crud/listing/get-listings-for-offer'
import { assertOfferItems } from '@echo/firestore/helpers/offer/assert/assert-offer-items'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { assoc, isEmpty, map, pipe, prop } from 'ramda'

interface NewOffer {
  receiver: Partial<FirestoreUserDetails>
  receiverItems: NonEmptyArray<FirestoreOfferItem>
  sender: Partial<FirestoreUserDetails>
  senderItems: NonEmptyArray<FirestoreOfferItem>
}

export async function addOffer(offer: NewOffer): Promise<string> {
  const { receiverItems, senderItems } = offer
  const listings = await getListingsForOffer(senderItems, receiverItems)
  const reference = firestoreApp().collection(CollectionName.OFFERS).doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  const offerId = reference.id
  const newOffer = pipe(
    assoc('id', offerId),
    assoc('createdAt', dayjs()),
    assoc('discordGuild', undefined),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('listingsIds', map(prop('id'), listings)),
    assoc('state', 'OPEN')
  )(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(offerDataConverter.toFirestore(newOffer))
  // update listings tied to this offer (if any)
  if (!isEmpty(listings)) {
    for (const listing of listings) {
      await addOfferToListing(listing, offerId)
    }
  }
  return offerId
}
