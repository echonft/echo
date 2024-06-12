import { guardAsyncFn } from '@echo/contract-listener/helpers/guard-async-fn'
import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByContractId } from '@echo/firestore/crud/offer/get-offer-by-contract-id'
import type { EchoOfferExecutedEventLog } from '@echo/web3/types/log/echo-offer-executed-event-log'
import { assoc, isNil } from 'ramda'

export async function handleOfferExecutedEvent(args: EventLogHandlerArgs<EchoOfferExecutedEventLog>) {
  const {
    log: {
      args: { offerId },
      transactionHash
    },
    logger
  } = args
  const fn = 'handleOfferExecutedEvent'
  const offer = await guardAsyncFn({ fn: getOfferByContractId, logger })(offerId)
  if (isNil(offer)) {
    logger?.error({ offer: { id: offerId }, fn }, 'offer not found')
    return
  }
  if (isNil(transactionHash)) {
    logger?.error({ offer: { id: offerId }, fn }, 'transactionHash is nil')
    return
  }
  await guardAsyncFn({
    fn: completeOffer,
    logger
  })({
    slug: offer.slug,
    transactionId: transactionHash,
    updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
  })
  logger?.info({ offer: assoc('id', offerId, offer), fn }, 'completed offer')
}
