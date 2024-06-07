import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'
import { getAllCollections } from '../../crud/collection/get-all-collections'

export async function assertCollections() {
  const documents = await getAllCollections()
  expect(eqListContent(documents, getAllCollectionMocks())).toBeTruthy()
}
