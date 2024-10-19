import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import type { EchoEventHandlerArgs } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function offerExecutedEventHandler(args: EchoEventHandlerArgs) {
  const { logger, event } = args
  const { offerId, transactionHash } = event
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
  await completeOffer({
    slug: offer.slug,
    transactionId: transactionHash
  })
  logger?.info({ offer }, 'completed offer')
}
