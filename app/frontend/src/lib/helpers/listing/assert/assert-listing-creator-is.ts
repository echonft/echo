import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { type Listing } from '@echo/model/types/listing'
import { type User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNil } from 'ramda'

export function assertListingCreatorIs(
  listing: Listing,
  username: string
): asserts listing is Omit<Listing, 'creator'> & Record<'creator', User> {
  if (isNil(listing.creator) || isNilOrEmpty(listing.creator.username)) {
    throw new BadRequestError()
  }
  if (listing.creator.username !== username) {
    throw new ForbiddenError()
  }
}
