import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert-offer-state-transition'
import type { WithSlug } from '@echo/model/types/with-slug'
import { andThen, isNil, objOf, pipe, tryCatch } from 'ramda'
import type { AuthRequestHandlerArgsWithParams } from '../../types/auth-request-handler'

export async function rejectOfferRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const offer = await getOffer(slug)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError())
  }
  tryCatch(assertOfferStateTransition, (err) => {
    throw new ForbiddenError({ err })
  })(offer, OFFER_STATE_REJECTED)
  if (offer.receiver.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return pipe(rejectOffer, andThen(pipe(objOf('offer'), toNextReponse)))(params)
}
