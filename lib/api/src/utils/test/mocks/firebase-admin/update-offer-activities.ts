import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { FirestoreRequestForOfferActivityData, offerFirestoreData } from '@echo/firestore'
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
    return Promise.reject(new Error('Not found'))
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Promise.resolve<WriteResult>({})
}
