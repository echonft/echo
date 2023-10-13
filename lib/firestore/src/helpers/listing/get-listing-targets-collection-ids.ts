import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getListingTargetsCollectionIds(
  listing: Partial<FirestoreListing> & Record<'targets', FirestoreListingTarget[]>
) {
  return pipe(prop('targets'), map(path(['collection', 'id'])), uniq)(listing) as string[]
}
