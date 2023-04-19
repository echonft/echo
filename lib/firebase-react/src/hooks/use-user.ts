import { UseDocumentOptions } from '../types/use-document-options'
import { useDocument } from './use-document'
import { FirestoreUser, FirestoreUserData } from '@echo/firestore'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { SWRResponse } from 'swr'

export const useUser = (
  userId: string | undefined,
  options?: UseDocumentOptions
): SWRResponse<R.Result<User, Error>, Error> =>
  useDocument<FirestoreUser, FirestoreUserData, User>(userId && `/users/${userId}`, options)
