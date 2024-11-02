// noinspection JSUnusedGlobalSymbols

import '@echo/utils/global'
import type { messages } from '@echo/ui/messages/en'

declare global {
  // get typings on translation keys
  type IntlMessages = typeof messages
}

export {}
