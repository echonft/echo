import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import type { EchoEventHandlerArgs } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function offerCancelledEventHandler(args: EchoEventHandlerArgs) {
  const { logger, event } = args
  const { offerId } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  if (offer.locked) {
    return Promise.reject(
      new BadRequestError({
        message: OfferError.Locked,
        severity: 'warning'
      })
    )
  }
  await cancelOffer(offer.slug)
  logger?.info({ offer }, 'cancelled offer')
}
