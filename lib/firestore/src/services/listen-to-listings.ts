import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { onSnapshot } from '@echo/firestore/services/on-doc-changes'
import type { ListingChangeHandler } from '@echo/firestore/types/change-handler/listing-change-handler'

export function listenToListings(onChange: ListingChangeHandler) {
  listingsCollection().onSnapshot(onSnapshot(onChange))
}
