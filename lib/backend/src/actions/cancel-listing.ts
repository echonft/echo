'use server'
import { AuthError } from '@echo/backend/constants/errors/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { listingDocumentToModel } from '@echo/firestore/converters/listing-document-to-model'
import { cancelListing as firestoreCancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Listing } from '@echo/model/types/listing'
import { andThen, isNil, pipe } from 'ramda'

export async function cancelListing(slug: Lowercase<string>): Promise<Listing> {
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirestore()
  const listing = await getListing(slug)
  if (isNil(listing)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  if (listing.locked || !eqUser(listing.creator, authUser)) {
    return Promise.reject(Error(AuthError.Forbidden))
  }
  return pipe(firestoreCancelListing, andThen(listingDocumentToModel))(slug)
}
