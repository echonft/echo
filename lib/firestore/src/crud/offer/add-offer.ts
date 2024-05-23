import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import type { BaseOffer } from '@echo/model/types/base-offer'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { nowMs } from '@echo/utils/helpers/now-ms'
import type { HexString } from '@echo/utils/types/hex-string'
import { pipe, toLower, toString } from 'ramda'

export async function addOffer(
  baseOffer: BaseOffer,
  idContract: HexString
): Promise<
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  const { receiverItems, senderItems } = baseOffer
  assertItems(receiverItems)
  assertItems(senderItems)
  await assertOfferIsNotADuplicate({ senderItems, receiverItems })

  const data: Offer = {
    createdAt: now(),
    idContract,
    readOnly: false,
    updatedAt: now(),
    slug: pipe(nowMs, toString, toLower<string>)(),
    ...baseOffer
  }

  const id = await setReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromOffer(data)
  return { id, data, listingOffers }
}
