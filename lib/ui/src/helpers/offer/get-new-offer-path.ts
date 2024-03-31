import { linkProvider } from '@echo/api/routing/link-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { stringify } from 'qs'
import { concat, is, isEmpty, map, prop } from 'ramda'

export function getNewOfferPath(selection: SelectableNft[] | SelectableNft) {
  if (is(Array, selection)) {
    if (isEmpty(selection)) {
      throw new Error('Cannot create offer with empty selection')
    }
    return concat(
      linkProvider.offer.new.get(),
      stringify(
        { receiverItems: map(prop('id'), selection) },
        { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true }
      )
    )
  }
  return concat(
    linkProvider.offer.new.get(),
    stringify({ receiverItems: prop('id', selection) }, { addQueryPrefix: true })
  )
}
