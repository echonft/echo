import { offerAcceptedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-accepted-event-handler'
import { offerCancelledEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-cancelled-event-handler'
import { offerCreatedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-created-event-handler'
import { offerExecutedEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/offer-executed-event-handler'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'

export async function echoEventHandler(event: EchoEvent) {
  if (event.type === EchoEventType.OfferCreated) {
    await offerCreatedEventHandler(event.offerId)
  } else if (event.type === EchoEventType.OfferExecuted) {
    await offerExecutedEventHandler(event)
  } else if (event.type === EchoEventType.OfferAccepted) {
    await offerAcceptedEventHandler(event.offerId)
  } else if (event.type === EchoEventType.OfferCancelled) {
    await offerCancelledEventHandler(event.offerId)
  }
}
