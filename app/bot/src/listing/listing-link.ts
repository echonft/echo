import { linkProvider } from '@echo/api/services/routing/link-provider'

export function listingLink(collectionSlug: string, listingId: string) {
  return linkProvider.collection.listing.getUrl({ slug: collectionSlug, listingId })
}
