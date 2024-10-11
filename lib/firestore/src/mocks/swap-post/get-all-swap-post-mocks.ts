import { swapPostMock } from '@echo/firestore/mocks/swap-post/swap-post-mock'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post/swap-post-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllSwapPostMocks() {
  return Object.values(swapPostMock()) as NonEmptyArray<SwapPostDocumentData>
}
