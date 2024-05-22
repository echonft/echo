import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertCollections() {
  const documents = await getAllCollections()
  expect(contentEq(documents, getAllCollectionMocks())).toBeTruthy()
}
