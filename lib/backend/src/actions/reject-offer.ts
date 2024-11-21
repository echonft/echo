'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer as firestoreRejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import { andThen, isNil, pipe } from 'ramda'

export async function rejectOffer(slug: Slug): Promise<Offer> {
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirestore()
  const offer = await getOffer(slug)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  if (offer.locked || !eqUser(offer.receiver, authUser)) {
    return Promise.reject(Error(AuthError.Forbidden))
  }
  return pipe(firestoreRejectOffer, andThen(offerDocumentToModel))(slug)
}
