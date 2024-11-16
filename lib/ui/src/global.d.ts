// noinspection JSUnusedGlobalSymbols

import '@auth/core'
import 'next-auth'
import '@echo/utils/global'
import type { User as ModelUser } from '@echo/model/types/user'
import type { messages } from '@echo/ui/messages/en'
import type { Nullable } from '@echo/utils/types/nullable'

declare global {
  // get typings on translation keys
  type IntlMessages = typeof messages
}

declare module 'next-auth' {
  interface User extends ModelUser {}

  interface Session {
    user?: Nullable<ModelUser>
  }
}

export {}
