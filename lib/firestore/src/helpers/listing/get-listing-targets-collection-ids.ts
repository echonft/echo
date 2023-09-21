import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { map, path, pipe, uniq } from 'ramda'

export function getListingTargetsCollectionIds(targets: NonEmptyArray<FirestoreListingTarget>) {
  return pipe(map(path(['collection', 'id'])), uniq)(targets) as string[]
}
