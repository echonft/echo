import { FirestoreSnapshot, FirestoreUser, userFirestoreData } from '@echo/firestore'
import { always, omit } from 'ramda'

export const userSnapshots: { [key: string]: FirestoreSnapshot<FirestoreUser> } = {
  oE6yUEQBPn7PZ89yMjKn: {
    ref: {
      path: 'users/oE6yUEQBPn7PZ89yMjKn'
    },
    id: 'oE6yUEQBPn7PZ89yMjKn',
    exists: true,
    data: always(omit(['refPath', 'id'], userFirestoreData['oE6yUEQBPn7PZ89yMjKn']))
  } as unknown as FirestoreSnapshot<FirestoreUser>
}
