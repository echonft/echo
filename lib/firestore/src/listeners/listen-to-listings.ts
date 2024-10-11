import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { ListingChangeHandler } from '@echo/firestore/types/change-handler/listing-change-handler'

export function listenToListings(onChange: ListingChangeHandler) {
  getListingsCollectionReference().onSnapshot(onSnapshot(onChange))
}
