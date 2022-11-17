import { mapCollection } from '../../mappers/collection'
import { FirebaseCollection } from '../../model/collection'
import { getAdminFirebase } from '../config/config'
import { Collection } from '@echo/model/collection'
import { DocumentSnapshot } from '@google-cloud/firestore'

/**
 * Get collection with discord id
 * @param id The collection discord id
 */
export function getCollection(id: string): Promise<Collection | undefined> {
  return getAdminFirebase()
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
