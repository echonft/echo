import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { DefaultJWT, DefaultSession } from 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends UserDocumentData {}

  interface JWT extends DefaultJWT {
    user?: UserDocumentData
  }

  interface Session extends DefaultSession {
    user?: UserDocumentData
  }
}

export {}
