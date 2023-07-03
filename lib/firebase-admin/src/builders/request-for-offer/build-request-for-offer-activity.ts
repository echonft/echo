import {
  FirestoreBuilder,
  FirestoreRequestForOfferActivity,
  FirestoreRequestForOfferActivityPrototype
} from '@echo/firestore'
import { call, invoker, modify } from 'ramda'

export const buildRequestForOfferActivity: FirestoreBuilder<
  FirestoreRequestForOfferActivityPrototype,
  FirestoreRequestForOfferActivity
> = async (prototype) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Promise.resolve(modify('date', call(invoker(0, 'unix')), prototype))
