/* eslint-disable @typescript-eslint/no-empty-interface */
// noinspection JSUnusedGlobalSymbols

import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'

declare module '@sentry/types' {
  interface User extends Pick<UserDocumentData, 'username'> {}
}
