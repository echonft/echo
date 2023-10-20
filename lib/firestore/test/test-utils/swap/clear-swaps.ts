import { deleteSwap } from '@test-utils/swap/delete-swap'
import { getAllSwaps } from '@test-utils/swap/get-all-swaps'

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
