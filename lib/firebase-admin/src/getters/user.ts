import { document } from './document'
import { FirestorePath, FirestoreUser, mapUser } from '@echo/firebase'
import { User } from '@echo/model'

/**
 * Get user with id
 * @param id The user id
 */
export function user(id: string): Promise<User> {
  return document<FirestoreUser, User>(id, FirebaseDocument.USERS, mapUser)
}
