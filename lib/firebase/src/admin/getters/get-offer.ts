import { getAdminFirebase } from '@echo/firebase/admin/config/config'
import { mapOffer } from '@echo/firebase/admin/mappers/offer'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { Offer } from '@echo/model/src/offer'
import { DocumentSnapshot } from '@google-cloud/firestore'

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
      return mapOffer(snapshot as DocumentSnapshot<FirebaseOffer>)
    })
}
