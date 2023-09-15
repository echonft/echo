import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { mapUserToUserDetails } from '@echo/firestore/mappers/map-user-to-user-details'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { ServerError } from '@server/helpers/error/server-error'

export const createOffer = async (
  sender: FirestoreDiscordUser,
  senderWallet: FirestoreWallet,
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  receiver: FirestoreDiscordUser,
  receiverWallet: FirestoreWallet,
  receiverItems: NonEmptyArray<FirestoreOfferItem>
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
