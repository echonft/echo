import { FirestoreActivityData } from '@echo/firestore'
import { OfferActivity, RequestForOfferActivity, SwapActivity } from '@echo/model'
import { call, invoker, modify } from 'ramda'

export function mapActivityToFirestoreData<T extends RequestForOfferActivity | OfferActivity | SwapActivity>(
  activity: T
): FirestoreActivityData {
  return modify<T, 'date', number>(
    'date',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    call(invoker(0, 'unix')),
    activity
  )
}
