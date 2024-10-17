import type { Awaitable } from '@echo/utils/types/awaitable'

import 'ramda'
import '@echo/auth/global'

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
}

export {}
