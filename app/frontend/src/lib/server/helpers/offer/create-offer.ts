import { ServerError } from '../error/server-error'
import { addOffer, mapUserToUserDetails, OfferItem, User, Wallet } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'

export const createOffer = async (
  sender: User,
  senderWallet: Wallet,
  senderItems: NonEmptyArray<OfferItem>,
  receiver: User,
  receiverWallet: Wallet,
  receiverItems: NonEmptyArray<OfferItem>
) => {
  try {
    return await addOffer({
      sender: mapUserToUserDetails(sender, senderWallet),
      senderItems,
      receiver: mapUserToUserDetails(receiver, receiverWallet),
      receiverItems
    })
  } catch (e) {
    throw new ServerError('Error creating offer')
  }
}
