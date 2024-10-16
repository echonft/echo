// noinspection JSUnusedGlobalSymbols

import { MessagesType } from '@echo/ui/types/messages'
import '@echo/auth/global'

declare global {
  // get typings on translation keys
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends MessagesType {}
}

export {}
