import { getAllOfferPostMocks } from '@echo/firestore-mocks/offer-post/get-all-offer-post-mocks'
import { find, propEq } from 'ramda'

export function getOfferPostMockByOfferId(offerId: string) {
  const mocks = getAllOfferPostMocks()
  return find(propEq(offerId, 'offerId'), mocks)!
}
