import { swapDocumentToModel } from '@echo/firestore/converters/swap-document-to-model'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { map } from 'ramda'

export function toSwaps(swaps: SwapDocument[]) {
  return map(swapDocumentToModel, swaps)
}
