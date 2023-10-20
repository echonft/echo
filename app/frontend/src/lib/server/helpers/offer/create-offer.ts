import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { ServerError } from '@server/helpers/error/server-error'

export async function createOffer(senderItems: NonEmptyArray<OfferItem>, receiverItems: NonEmptyArray<OfferItem>) {
  try {
    return await addOffer(senderItems, receiverItems)
  } catch (e) {
    throw new ServerError(
      `error creating offer with receiver items ${JSON.stringify(receiverItems)} and sender items ${JSON.stringify(
        senderItems
      )}`,
      e
    )
  }
}
