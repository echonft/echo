import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

export async function processEchoOfferExecutedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event } = args
  const { offerId, transactionHash } = event
  const offer = await guardAsyncFn({ fn: getOfferByIdContract, status: ErrorStatus.BAD_REQUEST, logger })(offerId)
  if (isNil(offer)) {
    logger?.error({ offer: { id: offerId } }, 'offer not found')
    return
  }
  await guardAsyncFn({
    fn: completeOffer,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({
    slug: offer.slug,
    transactionId: transactionHash,
    updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
  })
  logger?.info({ offer: assoc('id', offerId, offer) }, 'completed offer')
}
