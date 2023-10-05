import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingPostsCollection } from '@echo/firestore/helpers/collection/get-listing-posts-collection'
import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addListingPost(listingId: string, guildDiscordId: string, guildChannelId: string) {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error(`trying to add post for listing with id ${listingId} but this listing does not exist`)
  }
  const reference = getListingPostsCollection().doc()
  const id = reference.id
  const newListingPost: FirestoreListingPost = {
    id,
    listingId: listingId,
    guild: { discordId: guildDiscordId, channelId: guildChannelId },
    postedAt: dayjs()
  }
  await reference.set(newListingPost)
  return newListingPost
}
