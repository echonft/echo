import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import type { BaseOffer } from '@echo/model/types/base-offer'
import { type Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { now } from '@echo/utils/helpers/now'
import { nowMs } from '@echo/utils/helpers/now-ms'
import type { HexString } from '@echo/utils/types/hex-string'
import { assoc, pipe, toLower, toString } from 'ramda'

interface AddOfferArgs {
  baseOffer: BaseOffer
  idContract: HexString
}

export async function addOffer(args: AddOfferArgs): Promise<
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOffer>[]
  }
> {
  const { baseOffer, idContract } = args
  const { receiverItems, senderItems } = baseOffer
  assertItems(receiverItems)
  assertItems(senderItems)
  await assertOfferIsNotADuplicate({ senderItems, receiverItems })
  const data: Offer = pipe(
    assoc('createdAt', now()),
    assoc('idContract', toLower(idContract)),
    assoc('readOnly', false),
    assoc('updatedAt', now()),
    assoc('slug', pipe(nowMs, toString, toLower<string>)()),
    assoc('state', OFFER_STATE_OPEN as OfferState)
  )(baseOffer)
  const id = await setReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromOffer(data)
  return { id, data, listingOffers }
}
