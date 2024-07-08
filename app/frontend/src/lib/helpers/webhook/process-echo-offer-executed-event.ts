import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { swapOffer } from '@echo/frontend/lib/helpers/offer/swap-offer'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, map, objOf, pipe } from 'ramda'

export async function processEchoOfferExecutedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, transactionHash } = event
  const offer = await getOfferByIdContract(offerId)
  if (isNil(offer)) {
    return Promise.reject(new NotFoundError({ message: 'offer not found', severity: 'warning' }))
  }
  // Update offer items owner (we swap owners) then we move out of escrow
  const updatedOffer = swapOffer(offer)
  await pipe<[Offer], Nft[], Promise<void>[], Promise<void[]>>(
    getOfferItems,
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(updatedOffer)
  await completeOffer({
    slug: offer.slug,
    transactionId: transactionHash
  })
  logger?.info({ offer }, 'completed offer')
}
