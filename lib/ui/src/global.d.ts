// noinspection JSUnusedGlobalSymbols

import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { MessagesType } from '@echo/ui/types/messages'

declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}
}

declare module 'next-auth' {
  interface User extends UserDocumentData {}
}
