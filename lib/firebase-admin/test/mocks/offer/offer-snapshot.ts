import { offerFirestoreData } from '../../../../mocks/src/offer/offer-firestore-data'
import { FirestoreOffer, FirestoreSnapshot } from '@echo/firestore'
import { always, omit } from 'ramda'

export const offerSnapshots: { [key: string]: FirestoreSnapshot<FirestoreOffer> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: {
      path: 'offers/LyCfl6Eg7JKuD7XJ6IPi'
    },
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    exists: true,
    data: always(omit(['refPath', 'id'], offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']))
  } as unknown as FirestoreSnapshot<FirestoreOffer>
}
