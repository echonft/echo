import { getFirebase } from '../getters/get-firebase'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { firestore } from 'firebase-admin'
import CollectionReference = firestore.CollectionReference

/**
 * Get offers reference
 */
export function getOffersReference(): CollectionReference<FirebaseOffer> {
  return getFirebase().firestore().collection('offers') as unknown as CollectionReference<FirebaseOffer>
}
