import { guardAsyncFn } from '@echo/contract-listener/helpers/guard'
import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByContactId } from '@echo/firestore/crud/offer/get-offer-by-contact-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { EchoOfferExecutedEventLog } from '@echo/web3/types/log/echo-offer-executed-event-log'
import { isNil } from 'ramda'

export async function handleOfferExecutedEvent(args: EventLogHandlerArgs<EchoOfferExecutedEventLog>) {
  const {
    log: {
      args: { offerId },
      transactionHash
    }
  } = args

  const offer = await guardAsyncFn({ fn: getOfferByContactId })(offerId)
  if (isNil(offer)) {
    console.info(`Could not find offer ${offerId} after OfferExecutedEvent`)
    return
  }
  if (isNil(transactionHash)) {
    console.info(`transactionHash is nil in OfferExecutedEvent for offer ${offerId}`)
    return
  }
  await guardAsyncFn({
    fn: completeOffer,
    message: (err: unknown) => `Error completing offer after OfferExecutedEvent: ${errorMessage(err)}`
  })({
    slug: offer.slug,
    transactionId: transactionHash,
    updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
  })
  console.info(`Completed offer ${offer.slug}`)
}
