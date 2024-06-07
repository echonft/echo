import { listingMock } from '@echo/model/mocks/listing/listing-mock'
import { isNil } from 'ramda'

export function getListingMockById(id: string) {
  const mock = listingMock[id]
  if (isNil(mock)) {
    throw Error(`wrong listing mock id: ${id}`)
  }
  return mock
}
