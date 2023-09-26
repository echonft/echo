import { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { map, path, pipe, prop, uniq } from 'ramda'

export function getListingTargetsCollectionIds(listing: FirestoreListing) {
  return pipe(prop('targets'), map(path(['collection', 'id'])), uniq)(listing) as string[]
}
