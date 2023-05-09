import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { RequestForOfferActivity } from '@echo/model'
import { isNilOrEmpty } from '@echo/utils'
import { isNil, last } from 'ramda'

export const updateRequestForOfferActivities = (requestForOfferId: string, activities: RequestForOfferActivity[]) => {
  const requestForOfferRef = getDocRefFromPath('request-for-offers', requestForOfferId)
  if (isNil(requestForOfferRef)) {
    return Promise.reject('Request for offer not found')
  }
  if (isNilOrEmpty(activities)) {
    return Promise.reject('Invalid request for offer activities')
  }
  // Can force unwrap as we checked before if it's nil or empty
  const state = last(activities)!.toState
  return requestForOfferRef.update({
    state,
    activities
  })
}
