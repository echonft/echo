import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertOffer } from '@echo/frontend/lib/helpers/offer/assert/assert-offer'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { Nft } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, map, objOf, pipe } from 'ramda'

export async function processEchoOfferCancelledEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId } = event
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.SERVER_ERROR, logger })(offerId)
  assertOffer(offer)
  // Move all sender items out of escrow
  await pipe<[Nft[]], Promise<void>[], Promise<void[]>>(
    map(pipe(objOf('nft'), assoc('logger', logger), processOutEscrowTransfer)),
    promiseAll
  )(offer.senderItems)
  await guardAsyncFn({
    fn: cancelOffer,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ slug: offer.slug, updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } } })
  logger?.info({ offer }, 'cancelled offer')
}
