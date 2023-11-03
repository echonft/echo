import { addOffer } from '@echo/firestore/crud/offer/add-offer'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export async function guarded_addOffer(senderItems: NonEmptyArray<OfferItem>, receiverItems: NonEmptyArray<OfferItem>) {
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
