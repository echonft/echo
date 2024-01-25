import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export async function addOfferSignature(data: Omit<OfferSignature, 'id' | 'createdAt'>): Promise<OfferSignature> {
  const { offerId, userId } = data
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add signature for offer with id ${offerId} but this offer does not exist`)
  }
  const user = await findUserById(userId)
  if (isNil(user)) {
    throw Error(`trying to add an offer signature for a user that does not exist`)
  }
  if (user.username !== offer.receiver.username) {
    throw Error(`trying to add signature for offer with id ${offerId} but the user is not receiver`)
  }
  const existingOfferSignature = await findOfferSignature(offerId)
  if (isNil(existingOfferSignature)) {
    return pipe(getOfferSignaturesCollectionReference, setReference(assoc('createdAt', now(), data)))()
  }
  return pipe(
    getOfferSignaturesCollectionReference,
    updateReference<OfferSignature>(existingOfferSignature.id, { createdAt: now(), signature: data.signature })
  )()
}
