// noinspection JSUnusedGlobalSymbols

import { MessagesType } from '@echo/ui/types/messages'
import '@echo/auth/global'

declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}
}

export {}
