/* eslint-disable @typescript-eslint/no-empty-interface */
// noinspection JSUnusedGlobalSymbols

import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { DefaultJWT, DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User extends UserDocumentData {}

  interface JWT extends DefaultJWT {
    user?: UserDocumentData
  }

  interface Session extends DefaultSession {
    user?: UserDocumentData
  }
}

export {}
