import { getListingMockBySlug } from '@echo/model/mocks/listing/get-listing-mock-by-slug'
import type { Slug } from '@echo/model/types/slug'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'

export function resetListing(slug: Slug) {
  return updateListing(slug, getListingMockBySlug(slug))
}
