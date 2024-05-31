import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { swapMock } from '@echo/firestore-mocks/swap/swap-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllSwapMocks() {
  return Object.values(swapMock()) as NonEmptyArray<Swap>
}
