import { offerAcceptedEventHandler } from '@echo/frontend/lib/helpers/webhook/offer-accepted-event-handler'
import { offerCancelledEventHandler } from '@echo/frontend/lib/helpers/webhook/offer-cancelled-event-handler'
import { offerCreatedEventHandler } from '@echo/frontend/lib/helpers/webhook/offer-created-event-handler'
import { offerExecutedEventHandler } from '@echo/frontend/lib/helpers/webhook/offer-executed-event-handler'
import type { EchoEvent } from '@echo/frontend/lib/types/webhook/echo-event'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLogger } from '@echo/utils/types/with-logger'

export interface EchoEventHandlerArgs extends WithLogger {
  event: EchoEvent
  chain: ChainName
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
