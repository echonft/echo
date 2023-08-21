import { ApiError } from '../api-error'
import { addOffer, mapUserToUserDetails, OfferItem, User, Wallet } from '@echo/firestore'

export const createOffer = async (
  sender: User,
  senderWallet: Wallet,
  senderItems: OfferItem[],
  receiver: User,
  receiverWallet: Wallet,
  receiverItems: OfferItem[]
) => {
  try {
    return await addOffer({
      sender: mapUserToUserDetails(sender, senderWallet),
      senderItems,
      receiver: mapUserToUserDetails(receiver, receiverWallet),
      receiverItems
    })
  } catch (e) {
    throw new ApiError(500, 'Error creating offer')
  }
}
