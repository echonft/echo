// noinspection JSUnusedGlobalSymbols

import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends UserDocumentData {}
}

export {}
