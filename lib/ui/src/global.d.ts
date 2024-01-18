// noinspection JSUnusedGlobalSymbols

import { MessagesType } from '@echo/ui/types/messages'

declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}
}
