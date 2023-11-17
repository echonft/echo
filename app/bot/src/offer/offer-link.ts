import { linkProvider } from '@echo/api/services/routing/link-provider'

export function offerLink(offerId: string): string {
  return linkProvider.profile.offer.getUrl({ offerId })
}
