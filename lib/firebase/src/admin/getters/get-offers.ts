import { getAdminFirebase } from '@echo/firebase/admin/config/config'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { firestore } from 'firebase-admin'
import CollectionReference = firestore.CollectionReference

/**
 * Get offers reference
 */
export function getOffersReference(): CollectionReference<FirebaseOffer> {
  return getAdminFirebase().firestore().collection('offers') as unknown as CollectionReference<FirebaseOffer>
}
