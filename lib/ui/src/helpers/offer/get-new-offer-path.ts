import { linkProvider } from '@echo/api/routing/link-provider'
import { mapNftToQueryParam } from '@echo/ui/helpers/nft/map-nft-to-query-param'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { stringify } from 'qs'
import { concat, is, isEmpty, map } from 'ramda'

export function getNewOfferPath(selection: SelectableNft[] | SelectableNft) {
  if (is(Array, selection)) {
    if (isEmpty(selection)) {
      throw new Error('Cannot create offer with empty selection')
    }
    return concat(
      linkProvider.offer.new.get(),
      stringify(
        { receiverItems: map(mapNftToQueryParam, selection) },
        { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true }
      )
    )
  }
  return concat(
    linkProvider.offer.new.get(),
    stringify({ receiverItems: mapNftToQueryParam(selection) }, { addQueryPrefix: true })
  )
}
