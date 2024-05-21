import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
import { assertOfferItems } from '@echo/model/helpers/offer/assert/assert-offer-items'
import type { BaseOffer } from '@echo/model/types/base-offer'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import type { HexString } from '@echo/utils/types/hex-string'
import { pipe } from 'ramda'

export async function addOffer(baseOffer: BaseOffer, idContract: HexString): Promise<
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  const { receiverItems, senderItems } = baseOffer
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  await assertOfferIsNotADuplicate(senderItems, receiverItems)
  const newOffer = await pipe(
    getOffersCollectionReference,
    setReference({
      createdAt: now(),
      readOnly: false,
      updatedAt: now(),
      idContract,
      ...baseOffer
    })
  )()

const id = await setReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  // add listing offers (if any)
  await addListingOffersFromOffer(newOffer)
  return newOffer
}
