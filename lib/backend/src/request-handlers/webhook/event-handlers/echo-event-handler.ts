import { offerAcceptedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-accepted-event-handler'
import { offerCancelledEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-cancelled-event-handler'
import { offerCreatedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-created-event-handler'
import { offerExecutedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-executed-event-handler'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'

export function echoEventHandler(event: EchoEvent) {
  switch (event.type) {
    case EchoEventType.OfferCreated:
      return offerCreatedEventHandler(event.offerId)
    case EchoEventType.OfferExecuted:
      return offerExecutedEventHandler(event)
    case EchoEventType.OfferAccepted:
      return offerAcceptedEventHandler(event.offerId)
    case EchoEventType.OfferCancelled:
      return offerCancelledEventHandler(event.offerId)
    default:
      return
  }
}
