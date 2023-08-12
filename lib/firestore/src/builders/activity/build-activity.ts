import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreActivity } from '../../types/model/collections/activity/firestore-activity'
import { FirestoreOfferActivityPrototype } from '../../types/prototypes/offer/firestore-offer-activity-prototype'
import { FirestoreRequestForOfferActivityPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import { call, invoker, modify } from 'ramda'

export const buildActivity: FirestoreBuilder<
  FirestoreOfferActivityPrototype | FirestoreRequestForOfferActivityPrototype,
  FirestoreActivity
> = async (prototype) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Promise.resolve(modify('date', call(invoker(0, 'unix')), prototype))
