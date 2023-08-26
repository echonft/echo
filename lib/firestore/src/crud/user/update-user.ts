import { userDataConverter } from '../../converters/user-data-converter'
import { cleanAndUpdateDocumentRef } from '../../helpers/crud/clean-and-update-document-ref'
import { User } from '../../types/model/user'
import { getUserSnapshotById } from './get-user-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateUser = async (id: string, user: Partial<Omit<User, 'id'>>): Promise<WriteResult> => {
  const documentSnapshot = await getUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid user id')
  }

  return cleanAndUpdateDocumentRef(documentSnapshot.ref, user, userDataConverter)
}
