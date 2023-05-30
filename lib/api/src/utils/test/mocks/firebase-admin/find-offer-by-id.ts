import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { FirestoreOfferData, offerFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockFindOfferById = (id: string) => {
  const offer = offerFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject(new Error('not found'))
  }
  return R.fromPromise<FirestoreOfferData>(
    isNil(offer) ? Promise.reject(new Error('not found')) : Promise.resolve(offer)
  )
}
