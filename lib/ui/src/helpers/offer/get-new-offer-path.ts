import { pathProvider } from '@echo/api/routing/path-provider'
import type { Nft } from '@echo/model/types/nft'
import { mapNftToQueryParam } from '@echo/ui/helpers/nft/map-nft-to-query-param'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { stringify } from 'qs'
import { concat, dissoc, identity, is, juxt, map, modify, pipe, unless, when } from 'ramda'

interface GetNewOfferPathArgs {
  items: Nft[] | Nft
  target?: string
}

export function getNewOfferPath(args: GetNewOfferPathArgs) {
  if (isNilOrEmpty(args.items)) {
    throw new Error('Cannot create offer with empty selection')
  }
  const params = pipe(
    modify('items', pipe(unless(is(Array), juxt([identity])), map(mapNftToQueryParam))),
    when(propIsNil('target'), dissoc('target'))
  )(args)
  return concat(
    pathProvider.offer.new.get(),
    stringify(params, { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true })
  )
}
