import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName } from '@echo/firestore'
import { RequestForOfferActivity } from '@echo/model'
import { isNil } from 'ramda'

// TODO Maybe just an update?
export const updateRequestForOfferActivities = (
  requestForOfferId: string,
  activities: RequestForOfferActivity[],
  newActivity: RequestForOfferActivity
) => {
  const requestForOfferRef = getDocRefFromPath(CollectionName.REQUESTS_FOR_OFFER, requestForOfferId)
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
