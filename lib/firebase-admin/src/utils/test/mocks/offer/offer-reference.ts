import { offerSnapshots } from './offer-snapshot'
import { FirestoreUser } from '@echo/firestore'
import { DocumentReference } from 'firebase-admin/firestore'

export const offerReferences: { [key: string]: DocumentReference<FirestoreUser> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    path: 'offers/LyCfl6Eg7JKuD7XJ6IPi',
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    get: () => Promise.resolve(offerSnapshots['LyCfl6Eg7JKuD7XJ6IPi']!)
  } as unknown as DocumentReference<FirestoreUser>
}
