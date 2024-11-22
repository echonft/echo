import type { Listing } from '@echo/model/types/listing'

export function serializeListing<T extends Pick<Listing, 'slug'>>(listing: T): Lowercase<string> {
  return listing.slug
}
