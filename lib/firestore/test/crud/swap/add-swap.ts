import { swapsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import { type SwapDocument } from '@echo/firestore/types/model/swap-document'

export async function addSwap(data: SwapDocument): Promise<string> {
  return setReference({
    collectionReference: swapsCollection(),
    data
  })
}
