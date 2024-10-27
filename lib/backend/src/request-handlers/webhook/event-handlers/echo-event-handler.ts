import { offerAcceptedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-accepted-event-handler'
import { offerCancelledEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-cancelled-event-handler'
import { offerCreatedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-created-event-handler'
import { offerExecutedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-executed-event-handler'
import type { Chain } from '@echo/model/constants/chain'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'

export interface EchoEventHandlerArgs {
  readonly event: EchoEvent
  readonly chain: Chain
}

export function echoEventHandler(args: EchoEventHandlerArgs) {
  switch (args.event.type) {
    case EchoEventType.OfferCreated:
      return offerCreatedEventHandler(args)
    case EchoEventType.OfferExecuted:
      return offerExecutedEventHandler(args.event)
    case EchoEventType.OfferAccepted:
      return offerAcceptedEventHandler(args)
    case EchoEventType.OfferCancelled:
      return offerCancelledEventHandler(args.event)
    default:
      return
  }
}
