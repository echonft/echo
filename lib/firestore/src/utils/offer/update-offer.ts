import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'
import type { UpdateData } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateOffer(slug: string, data: UpdateData<Offer>): Promise<Offer> {
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer with slug ${slug} does not exist`))
  }
  return updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data
  })
}
