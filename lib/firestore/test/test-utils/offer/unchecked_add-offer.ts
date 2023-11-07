import { DEFAULT_EXPIRATION_TIME } from '@echo/firestore/constants/default-expiration-time'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import { now } from '@echo/utils/helpers/now'
import dayjs from 'dayjs'
import { head } from 'ramda'

export async function unchecked_addOffer(senderItems: OfferItem[], receiverItems: OfferItem[]): Promise<Offer> {
  const reference = getOffersCollectionReference().doc()
  const id = reference.id
  const newOffer: Offer = {
    id,
    createdAt: now(),
    expired: false,
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    receiver: head(receiverItems)!.nft.owner,
    receiverItems,
    sender: head(senderItems)!.nft.owner,
    senderItems,
    state: 'OPEN',
    updatedAt: now()
  }
  await reference.set(newOffer)
  return newOffer
}
