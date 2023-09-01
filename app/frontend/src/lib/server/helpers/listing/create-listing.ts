import { ServerError } from '../error/server-error'
import { addListing, ListingTarget, mapUserToUserDetails, OfferItem, User, Wallet } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'

export const createListing = async (
  creator: User,
  creatorWallet: Wallet,
  items: NonEmptyArray<OfferItem>,
  targets: NonEmptyArray<ListingTarget>
) => {
  try {
    return await addListing({
      creator: mapUserToUserDetails(creator, creatorWallet),
      items,
      targets
    })
  } catch (e) {
    throw new ServerError('Error creating listing')
  }
}
