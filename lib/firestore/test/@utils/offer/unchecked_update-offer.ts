import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export async function unchecked_updateOffer(slug: string, data: Partial<Offer>): Promise<Offer> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    throw Error(`offer with slug ${slug} does not exist`)
  }
  return updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data
  })
}
