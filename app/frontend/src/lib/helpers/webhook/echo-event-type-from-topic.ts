import {
  OFFER_CREATED_EVENT_HASH,
  OFFER_EXECUTED_EVENT_HASH
} from '@echo/frontend/lib/types/echo-event/echo-event-hashes'
import { OFFER_CREATED, OFFER_EXECUTED } from '@echo/frontend/lib/types/echo-event/echo-event-types'

export function echoEventTypeFromTopic(topic: string) {
  if (topic === OFFER_CREATED_EVENT_HASH) {
    return OFFER_CREATED
  }
  if (topic === OFFER_EXECUTED_EVENT_HASH) {
    return OFFER_EXECUTED
  }
  return ''
}
