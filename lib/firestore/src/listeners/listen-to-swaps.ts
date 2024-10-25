import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { SwapChangeHandler } from '@echo/firestore/types/change-handler/swap-change-handler'

export function listenToSwaps(onChange: SwapChangeHandler) {
  swapsCollection().onSnapshot(onSnapshot(onChange))
}
