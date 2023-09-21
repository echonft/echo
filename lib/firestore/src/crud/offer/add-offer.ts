import { CollectionName } from '@echo/firestore/constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { addOfferToListing } from '@echo/firestore/crud/listing/add-offer-to-listing'
import { getListingsForOffer } from '@echo/firestore/crud/listing/get-listings-for-offer'
import { assertOfferItems } from '@echo/firestore/helpers/offer/assert/assert-offer-items'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import dayjs from 'dayjs'
import { head, isEmpty, map, prop } from 'ramda'

export async function addOffer(
  receiverItems: NonEmptyArray<FirestoreOfferItem>,
  senderItems: NonEmptyArray<FirestoreOfferItem>
): Promise<FirestoreOffer> {
  const listings = await getListingsForOffer(senderItems, receiverItems)
  const reference = firestoreApp().collection(CollectionName.OFFERS).doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  const id = reference.id
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newOffer: FirestoreOffer = {
    id,
    createdAt: dayjs(),
    discordGuild: undefined,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day'),
    listingsIds: map(prop('id'), listings),
    receiver: head<FirestoreOfferItem, FirestoreOfferItem>(receiverItems).nft.owner!,
    receiverItems,
    sender: head<FirestoreOfferItem, FirestoreOfferItem>(senderItems).nft.owner!,
    senderItems,
    state: 'OPEN'
  }
  await reference.set(offerDataConverter.toFirestore(newOffer))
  // update listings tied to this offer (if any)
  if (!isEmpty(listings)) {
    for (const listing of listings) {
      await addOfferToListing(listing, id)
    }
  }
  return newOffer
}
