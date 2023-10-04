import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getAllSwapMocks } from '@echo/firestore-mocks/swap/get-all-swap-mocks'

export async function initializeSwaps() {
  const mocks = getAllSwapMocks()
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.SWAPS).doc(mock.id).set(mock)
  }
}
