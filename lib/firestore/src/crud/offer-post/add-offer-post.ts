import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferPostsCollection } from '@echo/firestore/helpers/collection/get-offer-posts-collection'
import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addOfferPost(offerId: string, guildDiscordId: string, guildThreadId: string) {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add post for offer with id ${offerId} but this offer does not exist`)
  }
  const reference = getOfferPostsCollection().doc()
  const id = reference.id
  const newOfferPost: FirestoreOfferPost = {
    id,
    offerId,
    guild: { discordId: guildDiscordId, threadId: guildThreadId },
    postedAt: dayjs()
  }
  await reference.set(newOfferPost)
  return newOfferPost
}
