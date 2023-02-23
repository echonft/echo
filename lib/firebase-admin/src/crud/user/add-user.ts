import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { FirestoreUser } from '@echo/firestore'

export const addUser = (user: FirestoreUser) => {
  return getCollectionFromPath('users').doc().set(user)
}
