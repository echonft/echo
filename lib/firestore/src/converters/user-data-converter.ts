import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { User } from '@echo/model/types/user'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assocPath, dissocPath, invoker, pipe, when } from 'ramda'

export const userDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData, UserDocumentData>): User {
    return pipe(
      invoker(0, 'data'),
      when(pathIsNil(['discord', 'globalName']), assocPath(['discord', 'globalName'], undefined)),
      dissocPath(['discord', 'id'])
    )(snapshot) as UserDocumentData
  },
  toFirestore(modelObject: WithFieldValue<User>): WithFieldValue<UserDocumentData> {
    return modelObject as WithFieldValue<UserDocumentData>
  }
}
