import { offerFirestoreData } from '../offer-firestore-data'
import { idRejecter, idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockFindOfferById = (id: string) => {
  const offer = offerFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject('not found')
  }
  if (isNil(offer)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(offer)
}
