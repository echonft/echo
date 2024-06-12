import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { ChangeHandler } from '@echo/firestore/types/change-handler'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'

export function listenToListings(onChange: ChangeHandler<Listing>) {
  getListingsCollectionReference().onSnapshot(onSnapshot<Listing, ListingDocumentData>(onChange))
}
