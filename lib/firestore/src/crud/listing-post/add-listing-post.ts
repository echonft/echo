import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { listingPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { ListingPostDocument } from '@echo/firestore/types/model/listing-post-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { isNil } from 'ramda'

export async function addListingPost(data: ListingPostDocument): Promise<NewDocument<ListingPostDocument>> {
  const listing = await getListingById(data.listingId)
  if (isNil(listing)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  const listingPost = await getListingPost({ listingId: data.listingId, guildId: data.guild.id })
  if (!isNil(listingPost)) {
    return Promise.reject(Error(ListingError.PostExists))
  }
  const id = await setReference({
    collectionReference: listingPostsCollection(),
    data
  })
  return { id, data }
}
