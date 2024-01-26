import { linkProvider } from '@echo/api/services/routing/link-provider'

export function listingLink(listingId: string) {
  return linkProvider.listing.details.getUrl({ listingId })
}
