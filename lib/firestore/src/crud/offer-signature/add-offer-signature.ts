import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferSignatureReference } from '@echo/firestore/crud/offer-signature/get-offer-signature-reference'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export async function addOfferSignature(data: Omit<OfferSignature, 'id' | 'createdAt'>) {
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
  const reference = await getOfferSignatureReference(offerId)
  const id = reference.id
  const offerSignature = pipe(assoc('id', id), assoc('createdAt', now()))(data) as OfferSignature
  await reference.set(offerSignature)
  return offerSignature
}
