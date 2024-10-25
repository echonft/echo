import { getListingPost } from '@echo/firestore/crud/listing-post/get-listing-post'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { isNil } from 'ramda'

export async function addListingPost(data: ListingPostDocumentData): Promise<NewDocument<ListingPostDocumentData>> {
  const listing = await getListingById(data.listingId)
  if (isNil(listing)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  const listingPost = await getListingPost({ listingId: data.listingId, guildId: data.guild.id })
  if (!isNil(listingPost)) {
    return Promise.reject(Error(ListingError.PostExists))
  }
  const id = await setReference({
    collectionReference: getListingPostsCollectionReference(),
    data
  })
  return { id, data }
}
