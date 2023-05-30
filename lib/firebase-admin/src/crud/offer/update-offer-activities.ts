import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreOfferActivityData } from '@echo/firestore'
import { isNil } from 'ramda'

// TODO Maybe just an update?
export const updateOfferActivities = (
  offerId: string,
  activities: FirestoreOfferActivityData[],
  newActivity: FirestoreOfferActivityData
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
