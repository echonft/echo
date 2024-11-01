'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer as firestoreRejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import { andThen, isNil, pipe } from 'ramda'

export async function rejectOffer(slug: Slug): Promise<Offer> {
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirebase()
  const offer = await getOffer(slug)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  if (offer.locked || offer.receiver.username !== authUser.username) {
    return Promise.reject(Error(AuthError.Forbidden))
  }
  return pipe(firestoreRejectOffer, andThen(offerDocumentToModel))(slug)
}
