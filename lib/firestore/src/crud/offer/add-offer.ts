import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { type Offer } from '@echo/model/types/offer/offer'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { assoc, isNil, pipe, toLower, toString } from 'ramda'

export async function addOffer(args: BaseOffer & Pick<Offer, 'idContract'>): Promise<NewDocument<Offer>> {
  const duplicate = await getOfferByIdContract(args.idContract)
  if (!isNil(duplicate)) {
    return Promise.reject(Error(OfferError.Duplicate))
  }
  const slug = pipe(nowMs, toString, toLower<string>)()
  const data: Offer = pipe(assoc('locked', false), assoc('slug', slug), assoc('state', OfferState.Open))(args)
  const id = await setReference<Offer, OfferDocumentData>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  return { id, data }
}
