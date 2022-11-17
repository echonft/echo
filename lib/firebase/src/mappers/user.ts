import { FirebaseUser } from '../model/user'
import { User } from '@echo/model/user'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirestoreDocumentSnapshot } from 'firebase/firestore'
import { isNil } from 'ramda'

/**
 * Map a firebase User snapshot to a User
 * @param snapshot The document snapshot
 */
export async function mapUser(
  snapshot: DocumentSnapshot<FirebaseUser> | FirestoreDocumentSnapshot<FirebaseUser>
): Promise<User> {
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
