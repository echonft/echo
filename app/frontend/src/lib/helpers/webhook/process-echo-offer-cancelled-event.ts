import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, map, objOf, pipe } from 'ramda'

export async function processEchoOfferCancelledEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  // Move all sender items out of escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(offer.senderItems)
  if (offer.readOnly) {
    return Promise.reject(
      new BadRequestError({
        message: 'received Echo offer cancelled event, but the offer is read only',
        severity: 'warning'
      })
    )
  }
  await cancelOffer({ slug: offer.slug })
  logger?.info({ offer }, 'cancelled offer')
}
