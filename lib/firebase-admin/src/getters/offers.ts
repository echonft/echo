import { firestore } from '../services/firestore'
import { FirestoreOffer } from '@echo/firebase'
import { CollectionReference } from '@google-cloud/firestore'

/**
 * Get offers reference
 */
export function offers(): CollectionReference<FirestoreOffer> {
  return firestore().collection('offers') as CollectionReference<FirestoreOffer>
}
