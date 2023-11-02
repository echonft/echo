import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import type { Offer } from '@echo/model/types/offer'
import { NextResponse } from 'next/server'
import { assoc, isNil } from 'ramda'

export class CancelOfferError extends ApiError<OfferResponse | ErrorResponse> {
  private readonly offer: Offer
  constructor(offer: Offer) {
    super(ErrorStatus.BAD_REQUEST, 'CancelOfferError', undefined, 'warn')
    this.offer = offer
  }

  async beforeError(): Promise<void> {
    try {
      await cancelOffer(this.offer.id)
    } catch (error) {
      this.caughtError = error as Error
    }
  }

  getErrorResponse(): NextResponse<OfferResponse | ErrorResponse> {
    if (!isNil(this.caughtError)) {
      return super.getErrorResponse()
    } else {
      return NextResponse.json<OfferResponse>({ offer: assoc('state', 'CANCELLED', this.offer) })
    }
  }
}
