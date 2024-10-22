// noinspection JSUnusedGlobalSymbols

import type { messages } from '@echo/ui/messages/en'
import '@echo/auth/global'
import '@echo/utils/global'

declare global {
  // get typings on translation keys
  type IntlMessages = typeof messages
}

export {}
