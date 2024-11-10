import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'

export function serializeListing<T extends Pick<Listing, 'slug'>>(listing: T): Slug {
  return listing.slug
}
