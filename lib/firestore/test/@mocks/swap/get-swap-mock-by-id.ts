import { swapMock } from '@echo/firestore-mocks/swap/swap-mock'
import { isNil } from 'ramda'

export function getSwapMockById(id: string) {
  const mock = swapMock[id]
  if (isNil(mock)) {
    throw Error(`wrong swap mock id: ${id}`)
  }
  return mock
}
