import {
  OFFER_ACCEPTED_EVENT_HASH,
  OFFER_CANCELLED_EVENT_HASH,
  OFFER_CREATED_EVENT_HASH,
  OFFER_EXECUTED_EVENT_HASH,
  OFFER_REDEEMED_EVENT_HASH
} from '@echo/frontend/lib/types/echo-event/echo-event-hashes'
import {
  OFFER_ACCEPTED,
  OFFER_CANCELLED,
  OFFER_CREATED,
  OFFER_EXECUTED,
  OFFER_REDEEMED
} from '@echo/frontend/lib/types/echo-event/echo-event-types'

export function echoEventTypeFromTopic(topic: string) {
  if (topic === OFFER_CREATED_EVENT_HASH) {
    return OFFER_CREATED
  }
  if (topic === OFFER_EXECUTED_EVENT_HASH) {
    return OFFER_EXECUTED
  }
  if (topic === OFFER_ACCEPTED_EVENT_HASH) {
    return OFFER_ACCEPTED
  }
  if (topic === OFFER_CANCELLED_EVENT_HASH) {
    return OFFER_CANCELLED
  }
  if (topic === OFFER_REDEEMED_EVENT_HASH) {
    return OFFER_REDEEMED
  }
  return ''
}
