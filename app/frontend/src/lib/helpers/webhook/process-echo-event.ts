import { processEchoOfferCreatedEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-created-event'
import { processEchoOfferExecutedEvent } from '@echo/frontend/lib/helpers/webhook/process-echo-offer-executed-event'
import type { EchoEvent } from '@echo/frontend/lib/types/echo-event/echo-event'
import { OFFER_CREATED, OFFER_EXECUTED } from '@echo/frontend/lib/types/echo-event/echo-event-types'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

export interface ProcessEchoEventArgs {
  event: EchoEvent
  chain: ChainName
}

export async function processEchoEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { event } = args
  switch (event.type) {
    case OFFER_CREATED:
      return processEchoOfferCreatedEvent(args)
    case OFFER_EXECUTED:
      return processEchoOfferExecutedEvent(args)
  }
}
