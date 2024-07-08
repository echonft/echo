import type { GetOfferByIdContractParams } from '@echo/api/types/params/get-offer-by-id-contract-params'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { isNil } from 'ramda'

export async function getOfferByIdContractRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<GetOfferByIdContractParams>) {
  const { idContract } = params
  const offer = await getOfferByIdContract(idContract)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError())
  }
  if (offer.sender.username !== username && offer.receiver.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return toNextReponse({ offer })
}
