import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/backend/types/auth-request-handler'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { andThen, isNil, objOf, pipe } from 'ramda'

export async function rejectOfferRequestHandler({
  user: { username },
  params: { slug }
}: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const offer = await getOffer(slug)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError())
  }
  if (offer.locked) {
    return Promise.reject(new UnauthorizedError())
  }
  if (offer.receiver.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return pipe(rejectOffer, andThen(pipe(objOf('offer'), toNextReponse)))(slug)
}
