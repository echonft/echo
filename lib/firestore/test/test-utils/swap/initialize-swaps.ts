import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { swapDocumentDataMock } from '@echo/firestore-mocks/swap/swap-document-data-mock'

export async function initializeSwaps() {
  const mocks = Object.values(swapDocumentDataMock)
  for (const mock of mocks) {
    await firestoreApp().collection(CollectionName.SWAPS).doc(mock.id).set(mock)
  }
}
