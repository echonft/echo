import { FirestoreUser } from '../../../src/types/model/collections/user/firestore-user'
import { userSnapshots } from './user-snapshot'
import { DocumentReference } from 'firebase-admin/firestore'

export const userReferences: { [key: string]: DocumentReference<FirestoreUser> } = {
  oE6yUEQBPn7PZ89yMjKn: {
    path: 'users/oE6yUEQBPn7PZ89yMjKn',
    id: 'oE6yUEQBPn7PZ89yMjKn',
    get: () => Promise.resolve(userSnapshots['oE6yUEQBPn7PZ89yMjKn']!)
  } as unknown as DocumentReference<FirestoreUser>
}
