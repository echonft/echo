import { type AuthUser } from '@echo/model/types/auth-user'
import { type MessagesType } from '@echo/ui/types/messages'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      VERCEL_URL: string
    }
  }
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  declare namespace FirebaseFirestore {
    interface FirestoreDataConverter<T> {
      toFirestore(modelObject: PartialWithFieldValue<T>): DocumentData
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends AuthUser {}
}
