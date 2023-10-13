import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getListingItemsIds(listing: Partial<FirestoreListing> & Record<'items', FirestoreListingItem[]>) {
  return pipe(prop('items'), map(path(['nft', 'id'])), uniq)(listing) as string[]
}
