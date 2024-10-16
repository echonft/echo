import type { GetOfferByIdContractRequest } from '@echo/api/types/requests/get-offer-by-id-contract-request'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/backend/types/auth-request-handler'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { isNil } from 'ramda'

export async function getOfferByIdContractRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<GetOfferByIdContractRequest>) {
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
