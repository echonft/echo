import { offerAcceptedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-accepted-event-handler'
import { offerCancelledEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-cancelled-event-handler'
import { offerCreatedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-created-event-handler'
import { offerExecutedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-executed-event-handler'
import type { Chain } from '@echo/utils/constants/chain'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { EchoEvent } from '@echo/web3/types/echo-event'

export interface EchoEventHandlerArgs extends WithLogger {
  event: EchoEvent
  chain: Chain
}

export function echoEventHandler(args: EchoEventHandlerArgs) {
  switch (args.event.type) {
    case 'OFFER_CREATED':
      return offerCreatedEventHandler(args)
    case 'OFFER_EXECUTED':
      return offerExecutedEventHandler(args)
    case 'OFFER_ACCEPTED':
      return offerAcceptedEventHandler(args)
    case 'OFFER_CANCELLED':
      return offerCancelledEventHandler(args)
    default:
      return
  }
}
