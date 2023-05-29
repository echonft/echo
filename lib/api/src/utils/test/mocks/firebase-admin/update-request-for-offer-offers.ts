import { idRejecter } from './id-rejecter'
import { idThrower } from './id-thrower'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { isNil } from 'ramda'

export const mockUpdateRequestForOfferOffers = (requestForOfferId: string, _offerId: string) => {
  const requestForOfferData = requestForOfferFirestoreData[requestForOfferId]
  if (isNil(requestForOfferData)) {
    return Promise.reject('Request for offer not found')
  }
  idThrower(requestForOfferId)
  if (idRejecter(requestForOfferId)) {
    return Promise.reject(new Error('Request For Offer not found'))
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Promise.resolve<WriteResult>({})
}
