// noinspection JSUnusedGlobalSymbols

import 'ramda'
import 'next-auth'
import '@auth/core'
import '@echo/utils/global'
import type { Username } from '@echo/model/types/username'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'

declare module '@sentry/nextjs' {
  export declare function setUser(username: Username): void
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
  interface User {
    username: Username
  }

  interface JWT {
    user?: Nullable<User>
  }

  interface Session {
    user?: Nullable<User>
  }
}

export {}
