import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreRequestForOffer } from '../../../src/types/model/collections/request-for-offer/firestore-request-for-offer'
import { requestForOfferFirestoreData } from './request-for-offer-firestore-data'
import { always, omit } from 'ramda'

export const requestForOfferSnapshots: { [key: string]: FirestoreSnapshot<FirestoreRequestForOffer> } = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: {
      path: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4'
    },
    id: 'jUzMtPGKM62mMhEcmbN4',
    exists: true,
    data: always(omit(['refPath', 'id'], requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']))
  } as unknown as FirestoreSnapshot<FirestoreRequestForOffer>
}
