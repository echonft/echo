import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { captureException } from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { assoc } from 'ramda'

export class CancelOfferError extends ApiError<OfferResponse | ErrorResponse> {
  private readonly offer: Offer
  private cancelled: boolean
  constructor(offer: Offer) {
    super(ErrorStatus.BAD_REQUEST, 'CancelOfferError')
    this.offer = offer
    this.cancelled = false
  }

  async beforeError(): Promise<void> {
    try {
      await cancelOffer(this.offer.id)
      this.cancelled = true
    } catch (error) {
      this.cancelled = false
      logger.debug(`${errorMessage(error)}`)
      captureException(error)
    }
  }

  getErrorResponse(): NextResponse<OfferResponse | ErrorResponse> {
    if (this.cancelled) {
      return NextResponse.json<OfferResponse>({ offer: assoc('state', 'CANCELLED', this.offer) })
    } else {
      return NextResponse.json<OfferResponse>({ offer: this.offer })
    }
  }
}
