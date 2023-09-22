import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { head, path, pipe, prop } from 'ramda'

export function getListingCreator(listing: FirestoreListing) {
  return pipe(prop('items'), head, path(['nft', 'owner']))(listing) as FirestoreUserDetails
}
