import { listingPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { ListingPostDocument } from '@echo/firestore/types/model/listing-post-document'

export function addListingPost(data: ListingPostDocument): Promise<string> {
  return setReference({
    collectionReference: listingPostsCollection(),
    data
  })
}
