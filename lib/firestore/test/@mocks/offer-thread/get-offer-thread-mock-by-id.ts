import { offerThreadMock } from '@echo/firestore-mocks/offer-thread/offer-thread-mock'
import { isNil } from 'ramda'

export function getOfferThreadMockById(id: string) {
  const mock = offerThreadMock[id]
  if (isNil(mock)) {
    throw Error(`wrong OfferThread mock id: ${id}`)
  }
  return mock
}
