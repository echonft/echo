import { FirebaseUser } from '../types'
import { DocumentSnapshot } from '../types/firestore'
import { User } from '@echo/model'
import { isNil } from 'rambda'

/**
 * Map a firebase User snapshot to a User
 * @param snapshot The document snapshot
 */
export async function mapUser(snapshot: DocumentSnapshot<FirebaseUser>): Promise<User> {
  const data = snapshot.data()
  if (isNil(data)) {
    return Promise.reject(`No data for ${snapshot.ref.path}`)
  }
  return Promise.resolve({
    id: snapshot.id,
    discordId: data.discordId,
    wallet: data.wallet
  })
}
