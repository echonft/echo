import { FirebaseOffer } from '../../model/offer'
import { getAdminFirebase } from '../config/config'
import { firestore } from 'firebase-admin'
import CollectionReference = firestore.CollectionReference

/**
 * Get offers reference
 */
export function getOffersReference(): CollectionReference<FirebaseOffer> {
  return getAdminFirebase().firestore().collection('offers') as unknown as CollectionReference<FirebaseOffer>
}
