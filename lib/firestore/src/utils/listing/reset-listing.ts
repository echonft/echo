import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import { getListingMockBySlug } from '@echo/model/mocks/listing/get-listing-mock-by-slug'
import type { Slug } from '@echo/model/types/slug'

export function resetListing(slug: Slug) {
  return updateListing(slug, getListingMockBySlug(slug))
}
