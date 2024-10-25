import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { DefaultJWT, DefaultSession } from 'next-auth'
import '@echo/utils/global'

declare module 'next-auth' {
  interface User extends UserDocument {}

  interface JWT extends DefaultJWT {
    user?: UserDocument
  }

  interface Session extends DefaultSession {
    user?: UserDocument
  }
}

export {}
