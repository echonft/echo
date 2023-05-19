import { requestForOfferFirestoreData } from '../../../../mocks/src/request-for-offer/request-for-offer-firestore-data'
import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreRequestForOffer } from '@echo/firestore'
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
