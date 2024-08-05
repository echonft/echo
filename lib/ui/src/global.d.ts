// noinspection JSUnusedGlobalSymbols

import { MessagesType } from '@echo/ui/types/messages'

declare global {
  // get typings on translation keys
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends MessagesType {}
}

export {}
