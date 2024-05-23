import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertCollections() {
  const documents = await getAllCollections()
  expect(eqListContent(documents, getAllCollectionMocks())).toBeTruthy()
}
