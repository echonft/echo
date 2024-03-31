import { linkProvider } from '@echo/api/routing/link-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { stringify } from 'qs'
import { concat, isEmpty, map, prop } from 'ramda'

export function getNewListingPathFromItems(selection: SelectableNft[]) {
  if (isEmpty(selection)) {
    throw new Error('Cannot create listing with empty selection')
  }
  return concat(
    linkProvider.listing.new.get(),
    stringify({ items: map(prop('id'), selection) }, { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true })
  )
}
