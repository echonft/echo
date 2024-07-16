import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { swapOffer } from '@echo/frontend/lib/helpers/offer/swap-offer'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Nft } from '@echo/model/types/nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, objOf, pipe } from 'ramda'

export async function processEchoOfferExecutedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, transactionHash } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  if (offer.readOnly) {
    return Promise.reject(
      new BadRequestError({
        message: 'received Echo offer executed event, but the offer is read only',
        severity: 'warning'
      })
    )
  }
  // Update offer items owner (we swap owners) then we move out of escrow
  const items = pipe(swapOffer, getOfferItems)(offer)
  for (const item of items) {
    await pipe<[Nft], Record<'nft', Nft>, WithLoggerType<Record<'nft', Nft>>, Promise<void>>(
      objOf('nft'),
      assoc('logger', args.logger),
      processOutEscrowTransfer
    )(item)
  }
  await completeOffer({
    slug: offer.slug,
    transactionId: transactionHash
  })
  logger?.info({ offer }, 'completed offer')
}
