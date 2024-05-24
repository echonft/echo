import { offerMock } from '@echo/model-mocks/offer/offer-mock'
import { isNil } from 'ramda'

export function getOfferMockById(id: string) {
  const mock = offerMock[id]
  if (isNil(mock)) {
    throw Error(`wrong offer mock id: ${id}`)
  }
  return mock
}
