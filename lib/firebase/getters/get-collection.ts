import { getFirebase } from '../getters/get-firebase'
import { mapCollection } from '../mappers/collection'
import { FirebaseCollection } from '../model/collection'
import { Collection } from '@echo/model/src/collection'
import { DocumentSnapshot } from '@google-cloud/firestore'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function getCollection(id: string): Promise<Collection | undefined> {
  return getFirebase()
    .firestore()
    .collection('collections')
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return undefined
      }
      return mapCollection(snapshot as DocumentSnapshot<FirebaseCollection>)
    })
}
