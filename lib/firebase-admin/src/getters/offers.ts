import { firestore } from '../services/firestore'
import { FirebaseOffer } from '@echo/firebase'
import { CollectionReference } from 'firebase-admin/firestore'

/**
 * Get offers reference
 */
export function offers(): CollectionReference<FirebaseOffer> {
  return firestore().collection('offers') as unknown as CollectionReference<FirebaseOffer>
}
