import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgsWithParams } from '@echo/backend/types/auth-request-handler'
import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'

interface Params {
  idContract: HexString
}

export async function getOfferByIdContractRequestHandler({
  user: { username },
  params
}: AuthRequestHandlerArgsWithParams<Params>) {
  const { idContract } = params
  const offer = await getOfferByIdContract(idContract)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError())
  }
  if (offer.sender.username !== username && offer.receiver.username !== username) {
    return Promise.reject(new ForbiddenError())
  }
  return toNextReponse({ offer: offerDocumentToModel(offer) })
}
