import { getFirebase } from '../getters/get-firebase'
import { FirebaseUser } from '@echo/firebase/model/user'
import { User } from '@echo/model/src/user'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { getAddress } from 'ethers/lib/utils'
import { head } from 'ramda'

/**
 * Get user with id
 * @param id The user id
 */
export function getUser(id: string): Promise<User | undefined> {
  return getFirebase()
    .firestore()
    .collection('users')
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return undefined
      }
      const data = snapshot.data() as unknown as FirebaseUser
      return {
        id: snapshot.id,
        discordId: data.discordId,
        wallet: data.wallet
      }
    })
}

/**
 * Get user with address, returns undefined if it doesn't exist
 * @param address The address to look up
 */
export async function getUserWithAddress(address: string) {
  return await getFirebase()
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
