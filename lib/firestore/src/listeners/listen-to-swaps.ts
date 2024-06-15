import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { ChangeHandler } from '@echo/firestore/types/change-handler'
import type { Swap } from '@echo/firestore/types/model/swap/swap'

export function listenToSwaps(onChange: ChangeHandler<Swap>) {
  getSwapsCollectionReference().onSnapshot(onSnapshot<Swap, Swap>(onChange))
}
