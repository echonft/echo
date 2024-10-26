import type { User as ModelUser } from '@echo/model/types/user'
import type { DefaultJWT, DefaultSession } from 'next-auth'
import '@echo/utils/global'

declare module 'next-auth' {
  interface User extends ModelUser {}

  interface JWT extends DefaultJWT {
    user?: ModelUser
  }

  interface Session extends DefaultSession {
    user?: ModelUser
  }
}

export {}
