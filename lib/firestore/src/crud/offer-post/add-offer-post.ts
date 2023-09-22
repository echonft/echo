import { CollectionName } from '@echo/firestore/constants/collection-name'
import { offerPostDocumentDataConverter } from '@echo/firestore/converters/offer-post/offer-post-document-data-converter'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addOfferPost(offerId: string, guildDiscordId: string, guildThreadId: string) {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add post for offer with id ${offerId} but this offer does not exist`)
  }
  const reference = firestoreApp().collection(CollectionName.OFFER_POSTS).doc()
  const id = reference.id
  const newOfferPost: OfferPostDocumentData = {
    id,
    offerId,
    guild: { discordId: guildDiscordId, threadId: guildThreadId },
    postedAt: dayjs().unix()
  }
  await reference.set(newOfferPost)
  return offerPostDocumentDataConverter.fromFirestore(newOfferPost)
}
