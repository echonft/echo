import { linkProvider } from '@echo/api/routing/link-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { stringify } from 'qs'
import { concat, is, isEmpty, isNil, map, prop } from 'ramda'

export function getNewOfferPathWithParams(selection: SelectableNft[] | SelectableNft) {
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
  if (isNil(selection)) {
    throw new Error('Cannot create offer with empty selection')
  }
  return concat(
    linkProvider.offer.new.get(),
    stringify({ receiverItems: prop('id', selection) }, { addQueryPrefix: true })
  )
}
