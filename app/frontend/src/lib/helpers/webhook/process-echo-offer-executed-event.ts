import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import { swapOffer } from '@echo/frontend/lib/helpers/offer/swap-offer'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, map, objOf, pipe } from 'ramda'

export async function processEchoOfferExecutedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, transactionHash } = event
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.BAD_REQUEST, logger })(offerId)
  assertOffer(offer)
  // Update offer items owner (we swap owners) then we move out of escrow
  const updatedOffer = swapOffer(offer)
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(updatedOffer.senderItems)
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(updatedOffer.receiverItems)

  await guardAsyncFn({
    fn: completeOffer,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({
    slug: offer.slug,
    transactionId: transactionHash
  })
  logger?.info({ offer }, 'completed offer')
}
