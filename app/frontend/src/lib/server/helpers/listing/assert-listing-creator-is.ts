import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { isNil } from 'ramda'

export function assertListingCreatorIs(
  listing: FirestoreListing,
  username: string
): asserts listing is FirestoreListing & { creator: FirestoreUserDetails } {
  if (isNil(listing.creator) || isNilOrEmpty(listing.creator.username)) {
    throw new BadRequestError(`listing with id ${listing.id} does not contain a creator`)
  }
  if (listing.creator.username !== username) {
    throw new ForbiddenError(
      `current user with username ${username} is not the creator of listing with id ${listing.id}. The listing creator username is ${listing.creator.username}`
    )
  }
}
