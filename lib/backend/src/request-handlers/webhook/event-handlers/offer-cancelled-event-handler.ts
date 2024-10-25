import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { info } from '@echo/backend/helpers/logger'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { isNil } from 'ramda'

export async function offerCancelledEventHandler(event: EchoEvent) {
  const { offerId } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: OfferError.NotFound, severity: 'warning' }))
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
  info({ offer }, 'cancelled offer')
}
