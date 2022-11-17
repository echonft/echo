import { getAdminFirebase } from '../config/config'
import { convertAdminDocumentSnapshot } from '../utils/document-snapshot'
import { mapOffer } from '@echo/firebase/mappers/offer'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Offer } from '@echo/model/offer'

/**
 * Get offer with id
 * @param id The offer id
 */
export function getOffer(id: string): Promise<Offer | undefined> {
  return getAdminFirebase()
    .firestore()
    .collection('offers')
    .doc(id)
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return undefined
      }
      return mapOffer(convertAdminDocumentSnapshot<FirebaseOffer>(snapshot))
    })
}
