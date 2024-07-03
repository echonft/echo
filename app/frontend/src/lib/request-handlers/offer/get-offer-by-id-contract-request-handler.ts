import type { GetOfferByIdContractParams } from '@echo/api/types/params/get-offer-by-id-contract-params'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { assertOfferUser } from '@echo/frontend/lib/helpers/offer/assert/assert-offer-user'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { NextResponse } from 'next/server'

export async function getOfferByIdContractRequestHandler({
  user,
  logger,
  params
}: AuthRequestHandlerArgsWithParams<GetOfferByIdContractParams>) {
  const { idContract } = params
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.NOT_FOUND, logger })(idContract)
  assertOffer(offer)
  assertOfferUser(offer, user.username)
  return NextResponse.json<OfferResponse>({ offer: offer })
}
