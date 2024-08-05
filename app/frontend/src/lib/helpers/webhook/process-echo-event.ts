import { processEchoOfferAcceptedEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-accepted-event'
import { processEchoOfferCancelledEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-cancelled-event'
import { processEchoOfferCreatedEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-created-event'
import { processEchoOfferExecutedEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-executed-event'
import type { EchoEvent } from '@echo/frontend/lib/types/webhook/echo-event'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

export interface ProcessEchoEventArgs {
  event: EchoEvent
  chain: ChainName
}

export async function processEchoEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { event } = args
  switch (event.type) {
    case 'OFFER_CREATED':
      return processEchoOfferCreatedEvent(args)
    case 'OFFER_EXECUTED':
      return processEchoOfferExecutedEvent(args)
    case 'OFFER_ACCEPTED':
      return processEchoOfferAcceptedEvent(args)
    case 'OFFER_CANCELLED':
      return processEchoOfferCancelledEvent(args)
  }
}
