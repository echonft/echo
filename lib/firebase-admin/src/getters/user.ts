import { document } from './document'
import { FirebaseDocument, mapUser } from '@echo/firebase'
import { User } from '@echo/model'

/**
 * Get user with id
 * @param id The user id
 */
export function user(id: string): Promise<User> {
  return document(id, FirebaseDocument.USERS, mapUser)
}
