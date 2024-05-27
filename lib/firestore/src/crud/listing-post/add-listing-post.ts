import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingPost, ListingPostDiscordGuild } from '@echo/firestore/types/model/listing-post/listing-post'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'

export async function addListingPost(
  listingId: string,
  guild: ListingPostDiscordGuild
): Promise<NewDocument<ListingPost>> {
  const data: ListingPost = {
    listingId,
    guild,
    postedAt: now()
  }
  const id = await setReference<ListingPost>({
    collectionReference: getListingPostsCollectionReference(),
    data
  })
  return { id, data }
}
