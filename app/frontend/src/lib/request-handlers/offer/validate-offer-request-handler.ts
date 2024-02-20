import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED } from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderOrReceiver } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-sender-or-receiver'
import type { AuthUser } from '@echo/model/types/auth-user'
import { assertOfferValid } from '@echo/web3/helpers/offer/assert-offer-valid'
import { NextResponse } from 'next/server'
import { isNil } from 'ramda'

export async function validateOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferSenderOrReceiver(offer, user.username)
  const result = await assertOfferValid(offer)
  if (!isNil(result.error)) {
    const cancelledOffer = await guardAsyncFn(
      cancelOffer,
      ErrorStatus.SERVER_ERROR
    )({
      offerId: offer.id,
      updateArgs: {
        trigger: {
          by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
          reason: OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
        }
      }
    })
    return NextResponse.json<OfferResponse>({ offer: cancelledOffer })
  }
  return NextResponse.json<OfferResponse>({ offer })
}
