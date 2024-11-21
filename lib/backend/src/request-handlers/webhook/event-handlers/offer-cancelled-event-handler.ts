import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { HexString } from '@echo/model/types/hex-string'
import { alwaysVoid } from '@echo/utils/helpers/always-void'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, isNil, otherwise, pipe } from 'ramda'

export async function offerCancelledEventHandler(offerId: HexString) {
  const offer = await pipe(getOfferByIdContract, otherwise(always<Nullable<OfferDocument>>(undefined)))(offerId)
  if (!isNil(offer) && !offer.locked) {
    await pipe(cancelOffer, otherwise(alwaysVoid))(offer.slug)
  }
}
