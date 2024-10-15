import { addListingOffersFromOffer } from '@echo/firestore/crud/listing-offer/add-listing-offers-from-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { assertOfferIsNotADuplicate } from '@echo/firestore/helpers/offer/assert/assert-offer-is-not-a-duplicate'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { BaseOffer } from '@echo/model/types/base-offer'
import { type Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { nowMs } from '@echo/utils/helpers/now-ms'
import type { HexString } from '@echo/utils/types/hex-string'
import { assoc, pipe, toLower, toString } from 'ramda'

interface AddOfferArgs {
  baseOffer: BaseOffer
  idContract: HexString
}

export async function addOffer(args: AddOfferArgs): Promise<
  NewDocument<Offer> & {
    listingOffers: NewDocument<ListingOfferDocumentData>[]
  }
> {
  const { baseOffer, idContract } = args
  const { receiverItems, senderItems } = baseOffer
  // FIXME put back when new Offer model is done
  // assertItems(receiverItems)
  // assertItems(senderItems)
  await assertOfferIsNotADuplicate({ senderItems, receiverItems })
  const data: Offer = pipe(
    assoc('idContract', toLower(idContract)),
    assoc('readOnly', false),
    assoc('slug', pipe(nowMs, toString, toLower<string>)()),
    assoc('state', OFFER_STATE_OPEN as OfferState)
  )(baseOffer)
  const id = await setReference<Offer, OfferDocumentData>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  // add listing offers (if any)
  const listingOffers = await addListingOffersFromOffer(data)
  return { id, data, listingOffers }
}
