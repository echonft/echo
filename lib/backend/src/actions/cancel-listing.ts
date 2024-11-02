'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/auth/get-auth-user'
import { listingDocumentToModel } from '@echo/firestore/converters/listing-document-to-model'
import { cancelListing as firestoreCancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import { andThen, isNil, pipe } from 'ramda'

export async function cancelListing(slug: Slug): Promise<Listing> {
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirebase()
  const listing = await getListing(slug)
  if (isNil(listing)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  if (listing.locked || listing.creator.username !== authUser.username) {
    return Promise.reject(Error(AuthError.Forbidden))
  }
  return pipe(firestoreCancelListing, andThen(listingDocumentToModel))(slug)
}
