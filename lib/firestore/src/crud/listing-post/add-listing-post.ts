import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import type { ListingPost, ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addListingPost(listingId: string, guild: ListingPostDiscordGuild) {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error(`trying to add post for listing with id ${listingId} but this listing does not exist`)
  }
  const reference = getListingPostsCollectionReference().doc()
  const id = reference.id
  const newListingPost: ListingPost = {
    id,
    listingId: listingId,
    guild,
    postedAt: now()
  }
  await reference.set(newListingPost)
  return newListingPost
}
