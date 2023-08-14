import { requestForOfferFirestoreData } from '../request-for-offer-firestore-data'
import { idRejecter, idThrower } from '@echo/utils'
import { WriteResult } from '@google-cloud/firestore'
import { isNil } from 'ramda'

export const mockUpdateRequestForOfferOffers = (requestForOfferId: string, _offerId: string) => {
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
