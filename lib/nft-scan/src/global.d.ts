// noinspection ES6UnusedImports

import type { Awaitable } from '@echo/utils/types/awaitable'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as R from 'ramda'

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
}
