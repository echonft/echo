import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-posts-collection-reference'
import { type OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addOfferPost(offerId: string, guildDiscordId: string, guildThreadId: string) {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add post for offer with id ${offerId} but this offer does not exist`)
  }
  const reference = getOfferPostsCollectionReference().doc()
  const id = reference.id
  const newOfferPost: OfferPost = {
    id,
    offerId,
    guild: { discordId: guildDiscordId, threadId: guildThreadId },
    postedAt: dayjs().unix()
  }
  await reference.set(newOfferPost)
  return newOfferPost
}
