import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import { assertListingStateTransition } from '@echo/model/helpers/listing/assert/assert-listing-state-transition'
import type { WithSlug } from '@echo/model/types/with-slug'
import { andThen, isNil, objOf, pipe, tryCatch } from 'ramda'

export async function cancelListingRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const listing = await getListing(slug)
  if (isNil(listing)) {
    return Promise.reject(new NotFoundError())
  }
  tryCatch(assertListingStateTransition, (err) => {
    throw new ForbiddenError({ err })
  })(listing, LISTING_STATE_CANCELLED)
  if (listing.creator.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return pipe(cancelListing, andThen(pipe(objOf('listing'), toNextReponse)))(slug)
}
