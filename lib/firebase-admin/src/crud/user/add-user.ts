import { buildUser } from '../../builders'
import { FirestoreUserPrototype } from '../../types'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'

export const addUser = (userPrototype: FirestoreUserPrototype) =>
  buildUser(userPrototype).then((user) => getCollectionFromPath('users').doc().set(user))
