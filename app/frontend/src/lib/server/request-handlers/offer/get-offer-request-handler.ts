import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import {
  OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED,
  OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
} from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { assertOfferItemsOwner } from '@echo/frontend/lib/server/helpers/offer/assert/assert_offer_items_owner'
import { assertOfferItemsApproval } from '@echo/frontend/lib/server/helpers/offer/assert/assert-offer-items-approval'
import { guarded_assertOfferExists } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-exists'
import { guarded_assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/server/helpers/offer/assert/guarded_assert-offer-receiver-or-sender-is'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'
import { assoc } from 'ramda'

export async function getOfferRequestHandler(req: ApiRequest<never>, offerId: string) {
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  guarded_assertOfferExists(offer, offerId)
  guarded_assertOfferReceiverOrSenderIs(offer, user.username)
  if (!(await assertOfferItemsOwner(offer))) {
    await guardAsyncFn(
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
    return NextResponse.json<OfferResponse>({ offer: assoc('state', 'CANCELLED', offer) })
  }
  if (!(await assertOfferItemsApproval(offer))) {
    await guardAsyncFn(
      cancelOffer,
      ErrorStatus.SERVER_ERROR
    )({
      offerId: offer.id,
      updateArgs: {
        trigger: {
          by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM,
          reason: OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED
        }
      }
    })
    return NextResponse.json<OfferResponse>({ offer: assoc('state', 'CANCELLED', offer) })
  }
  return NextResponse.json<OfferResponse>({ offer })
}
