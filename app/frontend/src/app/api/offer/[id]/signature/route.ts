import { ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getOfferSignatureRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/get-offer-signature-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { id: string } }) {
  return await handleRequest(request, getOfferSignatureRequestHandler, params.id)
}
