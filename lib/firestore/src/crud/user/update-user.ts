import { userDataConverter } from '../../converters/user-data-converter'
import { User } from '../../types/model/user'
import { getUserSnapshotById } from './get-user-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export const updateUser = async (
  id: string,
  user: Omit<User, 'id'> | Partial<Omit<User, 'id'>>
): Promise<WriteResult> => {
  const documentSnapshot = await getUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error('invalid user id')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(userDataConverter.toFirestore(user))
}
