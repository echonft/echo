import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, map, objOf, pipe } from 'ramda'

export async function processEchoOfferAcceptedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId } = event
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.SERVER_ERROR, logger })(offerId)
  assertOffer(offer)
  // Move all receiver items to escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processInEscrowTransfer)),
    promiseAll
  )(offer.receiverItems)
  await guardAsyncFn({
    fn: acceptOffer,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ slug: offer.slug })
  logger?.info({ offer }, 'accepted offer')
}
