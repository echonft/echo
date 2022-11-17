import { FirebaseOffer } from '../../model/offer'
import { getAdminFirebase } from '../config/config'
import { mapOffer } from '../mappers/offer'
import { Offer } from '@echo/model/offer'
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
