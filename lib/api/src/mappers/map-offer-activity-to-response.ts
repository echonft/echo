import { FirestoreActivityData } from '@echo/firestore'
import { OfferActivity, RequestForOfferActivity, SwapActivity } from '@echo/model'
import { call, invoker, modify } from 'ramda'

export function mapOfferActivityToResponse(
  activity: RequestForOfferActivity | OfferActivity | SwapActivity
): FirestoreActivityData {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return modify('date', call(invoker(0, 'unix')), activity)
}
