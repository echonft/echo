import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreRequestForOfferActivityPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import { FirestoreRequestForOfferActivity } from '@echo/firestore'

export const buildRequestForOfferActivity: FirestoreBuilder<
  FirestoreRequestForOfferActivityPrototype,
  FirestoreRequestForOfferActivity
> = async (prototype) =>
  Promise.resolve({
    fromState: prototype.fromState ?? undefined,
    toState: prototype.toState,
    date: prototype.date.unix()
  })
