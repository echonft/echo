import { deleteSwap } from '@echo/firestore-test/swap/delete-swap'
import { getAllSwaps } from '@echo/firestore-test/swap/get-all-swaps'

export async function clearSwaps() {
  const documents = await getAllSwaps()
  for (const document of documents) {
    try {
      await deleteSwap(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
