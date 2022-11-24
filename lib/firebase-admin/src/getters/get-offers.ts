import { firestore } from '../services/firestore'
import { FirebaseOffer } from '@echo/firebase/model/offer'
import { CollectionReference } from '@google-cloud/firestore'

/**
 * Get offers reference
 */
export function getOffersReference(): CollectionReference<FirebaseOffer> {
  return firestore().collection('offers') as unknown as CollectionReference<FirebaseOffer>
}
