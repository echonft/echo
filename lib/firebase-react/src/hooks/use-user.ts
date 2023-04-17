import { UseDocumentOptions } from '../types'
import { useDocument } from './use-document'
import { FirestoreUser, FirestoreUserData } from '@echo/firestore'
import { User } from '@echo/model'

export const useUser = (userId: string | undefined, options?: UseDocumentOptions) =>
  useDocument<FirestoreUser, FirestoreUserData, User>(userId && `/users/${userId}`, options)
