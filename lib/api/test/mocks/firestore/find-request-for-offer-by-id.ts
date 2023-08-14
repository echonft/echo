import { requestForOfferFirestoreData } from '../request-for-offer-firestore-data'
import { idRejecter, idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockFindRequestForOfferById = (id: string) => {
  const requestForOfferData = requestForOfferFirestoreData[id]
  idThrower(id)
  if (idRejecter(id)) {
    return Promise.reject('not found')
  }
  if (isNil(requestForOfferData)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(requestForOfferData)
}
