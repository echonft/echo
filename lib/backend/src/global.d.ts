// noinspection JSUnusedGlobalSymbols

import 'ramda'
import 'next-auth'
import '@auth/core'
import '@echo/utils/global'
import type { User as ModelUser } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

declare module 'next/server' {
  interface NextResponse {
    json<Body>(): Promise<Body>
  }
}

declare module 'next-auth' {
  interface User extends ModelUser {}

  interface JWT {
    user?: Nullable<User>
  }

  interface Session {
    user?: Nullable<User>
  }
}

export {}
