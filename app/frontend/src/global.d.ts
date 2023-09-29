import type { MessagesType } from '@echo/ui/types/messages'
import type { AuthUser } from '@echo/ui/types/model/auth-user'

export declare global {
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
