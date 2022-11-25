import { firestore } from '../services/firestore'
import { getDocument, getDocumentSnapshot } from '../utils/document'
import { mapUser } from '@echo/firebase/mappers/user'
import { FirebaseUser } from '@echo/firebase/model/user'
import { FirebaseDocument } from '@echo/firebase/paths/document-path'
import { User } from '@echo/model/user'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { getAddress } from 'ethers/lib/utils'
import { head } from 'ramda'

/**
 * Get user with id
 * @param id The user id
 */
export function getUser(id: string): Promise<User> {
  return getDocument(id, FirebaseDocument.USERS, mapUser)
}

export function getUserSnapshot(id: string) {
  return getDocumentSnapshot(id, FirebaseDocument.USERS)
}

/**
 * Get user with address, returns undefined if it doesn't exist
 * @param address The address to look up
 */
export async function getUserWithAddress(address: string) {
  return await firestore()
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
