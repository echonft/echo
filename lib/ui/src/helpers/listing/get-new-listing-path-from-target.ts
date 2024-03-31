import { linkProvider } from '@echo/api/routing/link-provider'
import { stringify } from 'qs'
import { concat } from 'ramda'

export function getNewListingPathFromTarget(slug: string) {
  return concat(linkProvider.listing.new.get(), stringify({ target: slug }, { addQueryPrefix: true }))
}
