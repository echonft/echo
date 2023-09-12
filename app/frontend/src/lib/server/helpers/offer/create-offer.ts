import { addOffer, mapUserToUserDetails } from '@echo/firestore'
import type { OfferItem, User, Wallet } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'
import { ServerError } from '@server/helpers/error/server-error'

export const createOffer = async (
  sender: User,
  senderWallet: Wallet,
  senderItems: NonEmptyArray<OfferItem>,
  receiver: User,
  receiverWallet: Wallet,
  receiverItems: NonEmptyArray<OfferItem>
) => {
  const newOffer = {
    sender: mapUserToUserDetails(sender, senderWallet),
    senderItems,
    receiver: mapUserToUserDetails(receiver, receiverWallet),
    receiverItems
  }
  try {
    return await addOffer(newOffer)
  } catch (e) {
    throw new ServerError(`error creating offer ${JSON.stringify(newOffer)}`, e)
  }
}
