import { ServerError } from '../error/server-error'
import { addListing, mapUserToUserDetails } from '@echo/firestore'
import { ListingTarget, OfferItem, User, Wallet } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

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
