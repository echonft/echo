import { FirestoreRequestForOfferActivityData, offerFirestoreData } from '@echo/firestore'
import { idRejecter, idThrower } from '@echo/utils'
import { WriteResult } from '@google-cloud/firestore'
import { isNil } from 'ramda'

export const mockUpdateOfferActivities = (
  offerId: string,
  _activities: FirestoreRequestForOfferActivityData[],
  _newActivity: FirestoreRequestForOfferActivityData
) => {
  const offerData = offerFirestoreData[offerId]
  if (isNil(offerData)) {
    return Promise.reject('Not found')
  }
  idThrower(offerId)
  if (idRejecter(offerId)) {
    return Promise.reject('Not found')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Promise.resolve<WriteResult>({})
}
