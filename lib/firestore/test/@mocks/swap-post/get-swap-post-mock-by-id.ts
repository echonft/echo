import { swapPostMock } from '@echo/firestore-mocks/swap-post/swap-post-mock'
import { isNil } from 'ramda'

export function getSwapPostMockById(id: string) {
  const mock = swapPostMock[id]
  if (isNil(mock)) {
    throw Error(`wrong SwapPost mock id: ${id}`)
  }
  return mock
}
