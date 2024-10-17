import { listingMock } from '@echo/model/mocks/listing/listing-mock'
import { isNil, pipe, prop } from 'ramda'

export function getListingMockById(id: string) {
  const mock = pipe(listingMock, prop(id))()
  if (isNil(mock)) {
    throw Error(`wrong listing mock id: ${id}`)
  }
  return mock
}
