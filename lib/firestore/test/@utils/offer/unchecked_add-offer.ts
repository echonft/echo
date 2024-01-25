import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import { now } from '@echo/utils/helpers/now'
import dayjs from 'dayjs'
import { head, pipe } from 'ramda'

export function unchecked_addOffer(senderItems: OfferItem[], receiverItems: OfferItem[]): Promise<Offer> {
  return pipe(
    getOffersCollectionReference,
    setReference({
      createdAt: now(),
      expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
      readOnly: false,
      receiver: head(receiverItems)!.nft.owner,
      receiverItems,
      sender: head(senderItems)!.nft.owner,
      senderItems,
      state: OFFER_STATE_OPEN,
      updatedAt: now()
    })
  )()
}
