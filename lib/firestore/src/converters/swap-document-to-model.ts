import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { Swap } from '@echo/model/types/swap'
import { dissoc, pipe } from 'ramda'

export function swapDocumentToModel(document: SwapDocument): Swap {
  return pipe(
    dissoc('receiverItemIndexes'),
    dissoc('receiverItemCollections'),
    dissoc('senderItemIndexes'),
    dissoc('senderItemCollections'),
    dissoc('offerId')
  )(document)
}
