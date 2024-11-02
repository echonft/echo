// noinspection JSUnusedGlobalSymbols

import '@echo/utils/global'
import 'next-auth'
import '@auth/core'
import type { User as ModelUser } from '@echo/model/types/user'
import type { messages } from '@echo/ui/messages/en'

declare global {
  // get typings on translation keys
  type IntlMessages = typeof messages
}

declare module 'next-auth' {
  interface User extends ModelUser {}

  interface Session {
    user?: ModelUser
  }
}

declare module '@auth/core' {
  interface User extends ModelUser {}

  interface Session {
    user?: ModelUser
  }
}

export {}
