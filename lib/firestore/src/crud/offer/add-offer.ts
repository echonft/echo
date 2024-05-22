import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import type { Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { nowMs } from '@echo/utils/helpers/now-ms'
import dayjs from 'dayjs'
import { head, pipe, toLower, toString } from 'ramda'

export async function addOffer(
  senderItems: Nft[],
  receiverItems: Nft[]
): Promise<
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  assertItems(receiverItems)
  assertItems(senderItems)
  await assertOfferIsNotADuplicate(senderItems, receiverItems)
  const data: Offer = {
    createdAt: now(),
    expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix(),
    idContract: 'todo', // TODO
    readOnly: false,
    receiver: head(receiverItems).owner,
    receiverItems,
    sender: head(senderItems).owner,
    senderItems,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: OFFER_STATE_OPEN,
    updatedAt: now()
  }
  const id = await setReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromOffer(data)
  return { id, data, listingOffers }
}
