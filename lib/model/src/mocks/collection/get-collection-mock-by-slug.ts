import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Slug } from '@echo/model/types/slug'
import { find, isNil, propEq } from 'ramda'

export function getCollectionMockBySlug(slug: Slug): Collection {
  const mock = find(propEq(slug, 'slug'), getAllCollectionMocks())
  if (isNil(mock)) {
    throw Error(`wrong collection mock slug: ${slug}`)
  }
  return mock
}
