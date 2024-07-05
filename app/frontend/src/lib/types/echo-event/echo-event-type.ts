import { ECHO_EVENT_TYPES } from '@echo/frontend/lib/types/echo-event/echo-event-types'

export type EchoEventType = (typeof ECHO_EVENT_TYPES)[number]
