import { FirestoreUser } from '../../../f
irebase/src/types'
import { DocumentSnapshot } from '.
./../../firebase/src/types/firestor
e'
import { User } from '@echo/model'
import { isNil } from 'rambda'

/**
 * Map a firebase User snapshot to a User
 * @param snapshot The document snapshot
 */
export async function mapUser(snapshot: DocumentSnapshot<FirestoreUser>): Promise<User> {
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
