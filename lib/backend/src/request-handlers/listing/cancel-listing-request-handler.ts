import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/backend/types/auth-request-handler'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import type { WithSlug } from '@echo/model/types/with-slug'
import { andThen, isNil, objOf, pipe } from 'ramda'

export async function cancelListingRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const listing = await getListing(slug)
  if (isNil(listing)) {
    return Promise.reject(new NotFoundError())
  }
  if (listing.locked) {
    return Promise.reject(new UnauthorizedError())
  }
  if (listing.creator.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return pipe(cancelListing, andThen(pipe(objOf('listing'), toNextReponse)))(slug)
}
