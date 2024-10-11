import { offerThreadMock } from '@echo/firestore/mocks/offer-thread/offer-thread-mock'
import { type OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread/offer-thread-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllOfferThreadMocks() {
  return Object.values(offerThreadMock()) as NonEmptyArray<OfferThreadDocumentData>
}
