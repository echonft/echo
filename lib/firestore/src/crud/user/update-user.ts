import { userDataConverter } from '../../converters/user-data-converter'
import { FirestoreModel } from '../../types/abstract/firestore-model'
import { User } from '../../types/model/user'
import { getUserSnapshotById } from './get-user-snapshot-by-id'
import { WriteResult } from 'firebase-admin/firestore'

export const updateUser = async (id: string, user: FirestoreModel<User>): Promise<WriteResult> => {
  const documentSnapshot = await getUserSnapshotById(id)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return documentSnapshot.ref.update(userDataConverter.toFirestore(user))
}
