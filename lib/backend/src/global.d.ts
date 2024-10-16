import type { User } from '@echo/auth/types/user'
import 'ramda'
import '@echo/auth/global'
import type { Awaitable } from '@echo/utils/types/awaitable'

declare module '@sentry/nextjs' {
  export declare function setUser(user: User | null): void
}

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
}

export {}
