import { offerMock } from '@echo/model/mocks/offer/offer-mock'
import { isNil, pipe, prop } from 'ramda'

export function getOfferMockById(id: string) {
  const mock = pipe(offerMock, prop(id))()
  if (isNil(mock)) {
    throw Error(`wrong offer mock id: ${id}`)
  }
  return mock
}
