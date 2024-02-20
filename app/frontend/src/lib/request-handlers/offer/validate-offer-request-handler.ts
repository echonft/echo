import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderOrReceiver } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-sender-or-receiver'
import type { AuthUser } from '@echo/model/types/auth-user'
import { validateOffer } from '@echo/tasks/offer/validate-offer'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { NextResponse } from 'next/server'

export async function validateOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferSenderOrReceiver(offer, user.username)
  const validOffer = await guardAsyncFn(validateOffer, ErrorStatus.SERVER_ERROR)(offer, pinoLogger)
  return NextResponse.json<OfferResponse>({ offer: validOffer })
}
