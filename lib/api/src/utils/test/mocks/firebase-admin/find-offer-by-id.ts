import { FirestoreOfferData, offerFirestoreData } from '@echo/firestore'
import { idRejecter, idThrower } from '@echo/utils'
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
