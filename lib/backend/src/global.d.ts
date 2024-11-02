// noinspection JSUnusedGlobalSymbols

import 'ramda'
import 'next-auth'
import '@auth/core'
import '@echo/utils/global'
import type { User, User as ModelUser } from '@echo/model/types/user'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'

declare module '@sentry/nextjs' {
  export declare function setUser(user: Nullable<User>): void
}

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
}

declare module 'next/server' {
  interface NextResponse {
    json<Body>(): Promise<Body>
  }
}

declare module 'next-auth' {
  interface User extends ModelUser {}

  interface JWT {
    user?: ModelUser
  }

  interface Session {
    user?: ModelUser
  }
}

declare module '@auth/core' {
  interface User extends ModelUser {}

  interface JWT {
    user?: ModelUser
  }

  interface Session {
    user?: ModelUser
  }
}

export {}
