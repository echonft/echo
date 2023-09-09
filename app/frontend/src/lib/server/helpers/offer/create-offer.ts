import { ServerError } from '../error/server-error'
import { addOffer, mapUserToUserDetails } from '@echo/firestore'
import { OfferItem, User, Wallet } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

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
