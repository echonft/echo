import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import type { Offer } from '@echo/model/types/offer'
import { dissoc, isNil } from 'ramda'

export interface UpdateOfferStateArgs extends OfferStateUpdateArgs {
  slug: string
}

export async function updateOfferState(args: UpdateOfferStateArgs): Promise<Offer> {
  const { slug, state } = args
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer with slug ${slug} does not exist`))
  }
  const offer = snapshot.data()
  assertOfferStateTransition(offer, state)
  const updatedOffer = await updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data: { state }
  })
  await addOfferStateUpdate({ offerId: snapshot.id, args: dissoc('slug', args) })
  return updatedOffer
}
