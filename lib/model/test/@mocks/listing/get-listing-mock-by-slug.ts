import type { Listing } from '@echo/model/types/listing'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { find, isNil, propEq } from 'ramda'

export function getListingMockBySlug(slug: string): Listing {
  const mock = find(propEq(slug, 'slug'), getAllListingMocks())
  if (isNil(mock)) {
    throw Error(`wrong listing mock slug: ${slug}`)
  }
  return mock
}
