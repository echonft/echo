import { ApiRequest } from '@echo/api/types/api-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import {
  OFFER_STATE_UPDATE_TRIGGER_REASON_APPROVAL_REVOKED,
  OFFER_STATE_UPDATE_TRIGGER_REASON_OWNERSHIP_CHANGED
} from '@echo/firestore/constants/offer/offer-state-update-trigger-reasons'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertOfferExists } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-exists'
import { guarded_assertOfferReceiverOrSenderIs } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-receiver-or-sender-is'
import { isOfferItemsApprovalValid } from '@echo/frontend/lib/helpers/offer/is-offer-items-approval-valid'
import { isOfferItemsOwnershipValid } from '@echo/frontend/lib/helpers/offer/is-offer-items-ownership-valid'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'
import { assoc } from 'ramda'

export async function getOfferRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOfferExists(offer, id)
  guarded_assertOfferReceiverOrSenderIs(offer, user.username)
  if (!(await isOfferItemsOwnershipValid(offer))) {
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
    return NextResponse.json<OfferResponse>({ offer: assoc('state', OFFER_STATE_CANCELLED, offer) })
  }
  if (!(await isOfferItemsApprovalValid(offer))) {
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
    return NextResponse.json<OfferResponse>({ offer: assoc('state', OFFER_STATE_CANCELLED, offer) })
  }
  return NextResponse.json<OfferResponse>({ offer })
}
