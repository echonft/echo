import { firestore } from '../services/firestore'
import { FirestoreUser } from '@echo/firebase'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { getAddress } from 'ethers/lib/utils'
import { head } from 'rambda'

export async function userWithAddress(address: string) {
  return await firestore()
    .collection('users')
    .where('wallet', '==', getAddress(address))
    .limit(1)
    .get()
    .then((snapshots) =>
      Promise.resolve(snapshots.empty ? undefined : (head(snapshots.docs) as QueryDocumentSnapshot<FirestoreUser>))
    )
}
