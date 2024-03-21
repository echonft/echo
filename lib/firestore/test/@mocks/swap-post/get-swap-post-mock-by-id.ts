import { swapPostMock } from '@echo/firestore-mocks/swap-post/swap-post-mock'

export function getSwapPostMockById(id: string) {
  return swapPostMock[id]!
}
