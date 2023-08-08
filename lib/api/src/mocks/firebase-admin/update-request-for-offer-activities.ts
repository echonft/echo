import { FirestoreRequestForOfferActivityData, requestForOfferFirestoreData } from '@echo/firestore'
import { idRejecter, idThrower } from '@echo/utils'
import { WriteResult } from '@google-cloud/firestore'
import { isNil } from 'ramda'

export const mockUpdateRequestForOfferActivities = (
  requestForOfferId: string,
  _activities: FirestoreRequestForOfferActivityData[],
  _newActivity: FirestoreRequestForOfferActivityData
) => {
  const requestForOfferData = requestForOfferFirestoreData[requestForOfferId]
  if (isNil(requestForOfferData)) {
    return Promise.reject('Request for offer not found')
  }
  idThrower(requestForOfferId)
  if (idRejecter(requestForOfferId)) {
    return Promise.reject('Request For Offer not found')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Promise.resolve<WriteResult>({})
}
