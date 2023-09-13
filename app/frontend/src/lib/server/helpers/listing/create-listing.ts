import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { mapUserToUserDetails } from '@echo/firestore/mappers/map-user-to-user-details'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { ServerError } from '@server/helpers/error/server-error'

export const createListing = async (
  creator: FirestoreUser,
  creatorWallet: FirestoreWallet,
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>
) => {
  const newListing = {
    creator: mapUserToUserDetails(creator, creatorWallet),
    items,
    targets
  }
  try {
    return await addListing(newListing)
  } catch (e) {
    throw new ServerError(`error creating listing ${JSON.stringify(newListing)}`, e)
  }
}
