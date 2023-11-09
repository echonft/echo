import { swapMock } from '@echo/firestore-mocks/swap/swap-mock'

export function getSwapMockById(id: string) {
  return swapMock[id]!
}
