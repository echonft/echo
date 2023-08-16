import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreActivityData } from '../../types/model/data/activity/firestore-activity-data'
import { isNil } from 'ramda'

// TODO Maybe just an update?
export const updateRequestForOfferActivities = (
  requestForOfferId: string,
  activities: FirestoreActivityData[],
  newActivity: FirestoreActivityData
) => {
  const requestForOfferRef = getDocRefFromPath(CollectionName.REQUESTS_FOR_OFFER, requestForOfferId)
  if (isNil(requestForOfferRef)) {
    return Promise.reject('Request for offer not found')
  }
  const state = newActivity.toState
  return requestForOfferRef.update({
    state,
    activities: activities.concat(newActivity)
  })
}
