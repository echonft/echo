// noinspection ES6UnusedImports
// noinspection JSUnusedGlobalSymbols

import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { Awaitable } from '@echo/utils/types/awaitable'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as R from 'ramda'

declare module '@sentry/types' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends Pick<UserDocumentData, 'username'> {}
}

declare module 'ramda' {
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>): <T>(promise: Promise<T>) => Promise<T>
  export function otherwise<T>(onError: (error: unknown) => Awaitable<T | void>, promise: Promise<T>): Promise<T>
}

export {}
