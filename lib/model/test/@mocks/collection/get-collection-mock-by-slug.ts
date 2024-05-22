import type { Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { find, isNil, propEq } from 'ramda'

export function getCollectionMockBySlug(slug: string): Collection {
  const mock = find(propEq(slug, 'slug'), getAllCollectionMocks())
  if (isNil(mock)) {
    throw Error(`wrong collection mock slug: ${slug}`)
  }
  return mock
}
