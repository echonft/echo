import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { swapMock } from '@echo/firestore-mocks/swap/swap-mock'

export async function initializeSwaps() {
  const mocks = Object.values(swapMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.SWAPS).doc(mock.id).set(mock)
  }
}
