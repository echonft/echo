import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import { type Offer } from '@echo/model/types/offer/offer'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { assoc, isNil, pipe } from 'ramda'

export async function addOffer(args: BaseOffer & Pick<Offer, 'idContract'>): Promise<NewDocument<Offer>> {
  const offer = await getOfferByIdContract(args.idContract)
  if (!isNil(offer)) {
    return Promise.reject(Error(OfferError.Exists))
  }
  const data: Offer = pipe(assoc('locked', false), assoc('slug', nowMsSlug()), assoc('state', OfferState.Open))(args)
  const id = await setReference<Offer, OfferDocumentData>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  return { id, data }
}
