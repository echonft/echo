import { firestore } from '../services/firestore'
import { FirebaseUser } from '@echo/firebase'
import { getAddress } from 'ethers/lib/utils'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { head } from 'rambda'

export async function userWithAddress(address: string) {
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
