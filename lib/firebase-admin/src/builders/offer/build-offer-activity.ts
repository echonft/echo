import { FirestoreBuilder, FirestoreOfferActivity, FirestoreOfferActivityPrototype } from '@echo/firestore'
import { call, invoker, modify } from 'ramda'

export const buildOfferActivity: FirestoreBuilder<FirestoreOfferActivityPrototype, FirestoreOfferActivity> = async (
  prototype
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Promise.resolve(modify('date', call(invoker(0, 'unix')), prototype))
