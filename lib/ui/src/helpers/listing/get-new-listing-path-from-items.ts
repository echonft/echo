import { pathProvider } from '@echo/api/routing/path-provider'
import type { Nft } from '@echo/model/types/nft'
import { mapNftToQueryParam } from '@echo/ui/helpers/nft/map-nft-to-query-param'
import { stringify } from 'qs'
import { concat, isEmpty, map } from 'ramda'

export function getNewListingPathFromItems(selection: Nft[]) {
  if (isEmpty(selection)) {
    throw new Error('Cannot create listing with empty selection')
  }
  return concat(
    pathProvider.listing.new.get(),
    stringify(
      { items: map(mapNftToQueryParam, selection) },
      { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true }
    )
  )
}
