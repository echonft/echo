import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap/swap'

export async function addSwap(data: Swap & Pick<SwapDocumentData, 'offerId'>): Promise<string> {
  return setReference<Swap, SwapDocumentData>({
    collectionReference: getSwapsCollectionReference(),
    data
  })
}
