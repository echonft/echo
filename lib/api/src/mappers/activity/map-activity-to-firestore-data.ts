import {
  FirestoreActivityData,
  FirestoreOfferActivityPrototype,
  FirestoreRequestForOfferActivityPrototype
} from '@echo/firestore'
import { call, invoker, modify } from 'ramda'

export function mapActivityToFirestoreData<
  T extends FirestoreRequestForOfferActivityPrototype | FirestoreOfferActivityPrototype
>(activity: T): FirestoreActivityData {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify<T, 'date', number>(
    'date',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    call(invoker(0, 'unix')),
    activity
  )
}
