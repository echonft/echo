import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { FirestoreRequestForOfferData, requestForOfferFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockFindRequestForOfferById = (id: string) => {
  const requestForOfferData = requestForOfferFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject(new Error('not found'))
  }
  return R.fromPromise<FirestoreRequestForOfferData>(
    isNil(requestForOfferData) ? Promise.reject(new Error('not found')) : Promise.resolve(requestForOfferData)
  )
}
