import { linkProvider } from '@echo/api/routing/link-provider'
import type { Nft } from '@echo/model/types/nft'
import { mapNftToQueryParam } from '@echo/ui/helpers/nft/map-nft-to-query-param'
import type { Selectable } from '@echo/ui/types/selectable'
import { stringify } from 'qs'
import { concat, isEmpty, map } from 'ramda'

export function getNewListingPathFromItems(selection: Nft[]) {
  if (isEmpty(selection)) {
    throw new Error('Cannot create listing with empty selection')
  }
  return concat(
    linkProvider.listing.new.get(),
    stringify(
      { items: map(mapNftToQueryParam, selection) },
      { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true }
    )
  )
}
