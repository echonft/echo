import { addListing, mapUserToUserDetails } from '@echo/firestore'
import type { ListingTarget, OfferItem, User, Wallet } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'
import { ServerError } from '@server/helpers/error/server-error'

export const createListing = async (
  creator: User,
  creatorWallet: Wallet,
  items: NonEmptyArray<OfferItem>,
  targets: NonEmptyArray<ListingTarget>
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
