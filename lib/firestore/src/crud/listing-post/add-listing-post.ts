import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'

export async function addListingPost(
  listingId: string,
  guild: ListingPostDocumentData['guild']
): Promise<NewDocument<ListingPostDocumentData>> {
  const data: ListingPostDocumentData = {
    listingId,
    guild,
    postedAt: now()
  }
  const id = await setReference<ListingPostDocumentData, ListingPostDocumentData>({
    collectionReference: getListingPostsCollectionReference(),
    data
  })
  return { id, data }
}
