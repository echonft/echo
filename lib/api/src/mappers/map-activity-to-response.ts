import { FirestoreActivityData } from '@echo/firestore'
import { OfferActivity, RequestForOfferActivity, SwapActivity } from '@echo/model'
import { call, invoker, modify } from 'ramda'

export function mapActivityToResponse(
  activity: RequestForOfferActivity | OfferActivity | SwapActivity
): FirestoreActivityData {
  return modify<RequestForOfferActivity | OfferActivity | SwapActivity, 'date', number>(
    'date',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    call(invoker(0, 'unix')),
    activity
  )
}
