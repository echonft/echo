import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { SwapChangeHandler } from '@echo/firestore/types/change-handler/swap-change-handler'

export function listenToSwaps(onChange: SwapChangeHandler) {
  getSwapsCollectionReference().onSnapshot(onSnapshot(onChange))
}
