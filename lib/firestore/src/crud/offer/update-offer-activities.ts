import { CollectionName } from '../../config/collection-name'
import { FirestoreActivityData } from '../../types/model/data/activity/firestore-activity-data'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { isNil } from 'ramda'

// TODO Maybe just an update?
export const updateOfferActivities = (
  offerId: string,
  activities: FirestoreActivityData[],
  newActivity: FirestoreActivityData
) => {
  const offerRef = getDocRefFromPath(CollectionName.OFFERS, offerId)
  if (isNil(offerRef)) {
    return Promise.reject('Offer not found')
  }
  const state = newActivity.toState
  return offerRef.update({
    state,
    activities: activities.concat(newActivity)
  })
}
