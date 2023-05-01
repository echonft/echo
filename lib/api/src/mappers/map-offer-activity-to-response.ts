import { OfferActivityResponse } from '../types/model/responses/offer-activity-response'
import { OfferActivity, RequestForOfferActivity, SwapActivity } from '@echo/model'

export function mapOfferActivityToResponse(
  activity: RequestForOfferActivity | OfferActivity | SwapActivity
): OfferActivityResponse {
  return {
    ...activity,
    date: activity.date.unix()
  }
}
