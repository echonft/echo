import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post-document-data'

export function addListingPost(data: ListingPostDocumentData): Promise<string> {
  return setReference<ListingPostDocumentData, ListingPostDocumentData>({
    collectionReference: getListingPostsCollectionReference(),
    data
  })
}
