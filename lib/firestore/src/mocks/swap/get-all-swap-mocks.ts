import { swapMock } from '@echo/firestore/mocks/swap/swap-mock'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllSwapMocks() {
  return Object.values(swapMock()) as NonEmptyArray<SwapDocumentData>
}
