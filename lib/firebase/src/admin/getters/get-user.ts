import { mapUser } from '../../mappers/user'
import { FirebaseUser } from '../../model/user'
import { getAdminFirebase } from '../config/config'
import { convertDocumentSnapshotToFirebase } from '../utils/document-snapshot'
import { User } from '@echo/model/user'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { getAddress } from 'ethers/lib/utils'
import { head } from 'ramda'

/**
 * Get user with id
 * @param id The user id
 */
export function getUser(id: string): Promise<User | undefined> {
  return getAdminFirebase()
    .firestore()
    .collection('users')
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return undefined
      }
      return mapUser(convertDocumentSnapshotToFirebase<FirebaseUser>(snapshot))
    })
}

/**
 * Get user with address, returns undefined if it doesn't exist
 * @param address The address to look up
 */
export async function getUserWithAddress(address: string) {
  return await getAdminFirebase()
    .firestore()
    .collection('users')
    .where('wallet', '==', getAddress(address))
    .limit(1)
    .get()
    .then((snapshots) =>
      Promise.resolve(
        snapshots.empty ? undefined : (head(snapshots.docs) as unknown as QueryDocumentSnapshot<FirebaseUser>)
      )
    )
}
