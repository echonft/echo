import { pathProvider } from '@echo/api/routing/path-provider'
import { stringify } from 'qs'
import { concat } from 'ramda'

export function getNewListingPathFromTarget(slug: string) {
  return concat(pathProvider.listing.new.get(), stringify({ target: slug }, { addQueryPrefix: true }))
}
