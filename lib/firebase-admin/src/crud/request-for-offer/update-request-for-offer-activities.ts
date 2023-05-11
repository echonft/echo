import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { RequestForOfferActivity } from '@echo/model'
import { isNil } from 'ramda'

export const updateRequestForOfferActivities = (
  requestForOfferId: string,
  activities: RequestForOfferActivity[],
  newActivity: RequestForOfferActivity
) => {
  const requestForOfferRef = getDocRefFromPath('request-for-offers', requestForOfferId)
  if (isNil(requestForOfferRef)) {
    return Promise.reject('Request for offer not found')
  }
  // Can force unwrap as we checked before if it's nil or empty
  const state = newActivity.toState
  return requestForOfferRef.update({
    state,
    activities: activities.concat(newActivity)
  })
}
