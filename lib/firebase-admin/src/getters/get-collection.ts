import { getAdminFirebase } from '../config/config'
import { convertAdminDocumentSnapshot } from '../utils/document-snapshot'
import { mapCollection } from '@echo/firebase/mappers/collection'
import { FirebaseCollection } from '@echo/firebase/model/collection'
import { Collection } from '@echo/model/collection'

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
      return mapCollection(convertAdminDocumentSnapshot<FirebaseCollection>(snapshot))
    })
}
